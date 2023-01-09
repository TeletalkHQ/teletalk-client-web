import { trier } from "utility-store/src/classes/Trier";

import { actions } from "src/store/actions";

import { apiManager } from "src/classes/api/ApiManager";
import { commonTasks } from "src/classes/CommonTasks";
import { notificationManager } from "src/classes/NotificationManager";
import { userUtilities } from "src/classes/UserUtilities";

import { store } from "src/store/store";
import { commonActions } from "src/store/commonActions";

import { variables } from "src/variables";

const printTokenNotFound = () =>
  notificationManager.submitErrorNotification(
    variables.notification.error.VERIFY_TOKEN_NOT_FOUND
  );

const update = (data, dispatch) => {
  userUtilities.removeToken();
  userUtilities.saveToken(data.token);

  dispatch(actions.updateAllUserData(data.user));
  dispatch(commonActions.changeViewMode.messenger());
};

const verifySignIn = () => {
  const tryToVerifySignIn = async (verificationCode, dispatch) => {
    const token = userUtilities.getToken();

    if (!token) {
      dispatch(commonActions.changeViewMode.signIn());
      printTokenNotFound();
      return;
    }

    return await apiManager.apis.verify.sendFullFeaturedRequest(
      {
        verificationCode,
      },
      { token }
    );
  };

  const executeIfNoErrorTryToVerifySignIn = (response, dispatch) => {
    dispatch(actions.verificationCodeOnChange({ verificationCode: "" }));

    if (response.data.newUser) {
      dispatch(commonActions.changeViewMode.createNewUser());
    } else {
      update(response.data, dispatch);
    }
  };

  return async (dispatch, getState = store.initialStates) => {
    const {
      auth: { verificationCode },
    } = getState();

    dispatch(commonActions.changeAuthenticationProgress(true));

    await trier(verifySignIn.name)
      .tryAsync(tryToVerifySignIn, verificationCode, dispatch)
      .executeIfNoError(executeIfNoErrorTryToVerifySignIn, dispatch)
      .runAsync();

    dispatch(commonActions.changeAuthenticationProgress(false));
  };
};

const signIn = () => {
  const tryToSignIn = async ({ countryCode, countryName, phoneNumber }) => {
    return await apiManager.apis.signIn.sendFullFeaturedRequest({
      countryCode,
      countryName,
      phoneNumber,
    });
  };
  const executeIfNoErrorOnTryToSignIn = (response, dispatch) => {
    const { token } = response.data;
    userUtilities.saveToken(token);

    dispatch(commonActions.changeViewMode.verifySignIn());
  };

  return async (dispatch, getState = store.initialStates) => {
    const {
      auth: { phoneNumber, countryCode, countryName },
    } = getState();
    dispatch(commonActions.changeAuthenticationProgress(true));

    await trier(signIn.name)
      .tryAsync(tryToSignIn, {
        countryCode,
        countryName,
        phoneNumber,
      })
      .executeIfNoError(executeIfNoErrorOnTryToSignIn, dispatch)
      .runAsync();

    dispatch(commonActions.changeAuthenticationProgress(false));
  };
};

const logout = () => {
  const tryToLogout = async () =>
    await apiManager.apis.logout.sendFullFeaturedRequest();

  return async (dispatch) => {
    await trier(logout.name)
      .tryAsync(tryToLogout)
      .executeIfNoError(() => {
        commonTasks.resetEverything();
        dispatch(commonActions.changeViewMode.signIn());
      })
      .runAsync();
  };
};

const createNewUser = () => {
  const tryToCreateNewUser = async (firstName, lastName, dispatch) => {
    const token = userUtilities.getToken();
    commonTasks.checkAndExecute(!token, () => {
      dispatch(commonActions.changeViewMode.signIn());
      printTokenNotFound();
    });

    const { data } =
      await apiManager.apis.createNewUser.sendFullFeaturedRequest(
        {
          firstName,
          lastName,
        },
        { token }
      );

    return data;
  };

  return async (dispatch, getState = store.initialStates) => {
    const {
      auth: { firstName, lastName },
    } = getState();

    dispatch(commonActions.changeAuthenticationProgress(true));

    await trier(createNewUser.name)
      .tryAsync(tryToCreateNewUser, firstName, lastName, dispatch)
      .executeIfNoError(update, dispatch)
      .runAsync();

    dispatch(commonActions.changeAuthenticationProgress(false));
  };
};

const authControllers = {
  createNewUser,
  logout,
  signIn,
  verifySignIn,
};

export { authControllers };
