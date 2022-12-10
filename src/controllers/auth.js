import { trier } from "utility-store/src/classes/Trier";

import { actions } from "src/store/actions";

import { apiManager } from "src/classes/api/ApiManager";
import { commonTasks } from "src/classes/CommonTasks";
import { notificationManager } from "src/classes/NotificationManager";
import { persistentStorage } from "src/classes/PersistentStorage";
import { userPropsUtilities } from "src/classes/UserPropsUtilities";

import { utilities } from "src/utilities";

import { store } from "src/store/store";
import { commonActions } from "src/store/commonActions";

import { variables } from "src/variables";

const saveTokenIntoPersistentStorage = (token) =>
  persistentStorage.setItem(persistentStorage.STORAGE_KEYS.TOKEN, token);

const printTokenNotFound = () =>
  notificationManager.submitErrorNotification(
    variables.notification.error.VERIFY_TOKEN_NOT_FOUND
  );

const verifySignIn = () => {
  const tryToVerifySignIn = async (verificationCode, dispatch) => {
    const token = persistentStorage.getItem(
      persistentStorage.STORAGE_KEYS.TOKEN
    );
    if (!token) {
      dispatch(commonActions.changeViewMode.signIn());
      printTokenNotFound();
      return;
    }

    return await apiManager.apis.verifySignInNormal.sendFullFeaturedRequest(
      {
        verificationCode,
      },
      { token: token }
    );
  };

  const tasksIfUserIsNotNew = (dispatch, user) => {
    persistentStorage.removeItem(persistentStorage.STORAGE_KEYS.TOKEN);

    const token = user.token;
    delete user.token;
    delete user.newUser;

    saveTokenIntoPersistentStorage(token);

    dispatch(actions.updateAllUserData(user));
    dispatch(commonActions.changeViewMode.messenger());
  };
  const executeIfNoErrorTryToVerifySignIn = (response, dispatch) => {
    dispatch(actions.verificationCodeOnChange({ verificationCode: "" }));
    const { user } = response.data;

    if (user.newUser) {
      dispatch(commonActions.changeViewMode.createNewUser());
    } else {
      tasksIfUserIsNotNew(dispatch, user);
    }
  };

  return async (dispatch, getState = store.initialStates) => {
    const {
      auth: { verificationCode },
    } = getState();

    dispatch(commonActions.changeAuthenticationProgress(true));

    (
      await trier(verifySignIn.name).tryAsync(
        tryToVerifySignIn,
        verificationCode,
        dispatch
      )
    )
      .executeIfNoError(executeIfNoErrorTryToVerifySignIn, dispatch)
      .printError();

    dispatch(commonActions.changeAuthenticationProgress(false));
  };
};

const signIn = () => {
  const tryToSignIn = async ({ countryCode, countryName, phoneNumber }) => {
    return await apiManager.apis.signInNormal.sendFullFeaturedRequest({
      countryCode,
      countryName,
      phoneNumber,
    });
  };
  const executeIfNoErrorOnTryToSignIn = (response, dispatch) => {
    const { token } = response.data.user;
    persistentStorage.setItem(persistentStorage.STORAGE_KEYS.TOKEN, token);

    dispatch(commonActions.changeViewMode.verifySignIn());
  };

  return async (dispatch, getState = store.initialStates) => {
    const {
      auth: { phoneNumber, countryCode, countryName },
    } = getState();
    dispatch(commonActions.changeAuthenticationProgress(true));

    (
      await trier(signIn.name).tryAsync(tryToSignIn, {
        countryCode,
        countryName,
        phoneNumber,
      })
    )
      .executeIfNoError(executeIfNoErrorOnTryToSignIn, dispatch)
      .printError()
      .result();

    dispatch(commonActions.changeAuthenticationProgress(false));
  };
};

const logout = () => {
  const tryToLogout = async () =>
    await apiManager.apis.logoutNormal.sendFullFeaturedRequest();

  return async (dispatch) => {
    (await trier(logout.name).tryAsync(tryToLogout))
      .printError()
      .executeIfNoError(() => {
        commonTasks.resetEverything();
        dispatch(commonActions.changeViewMode.signIn());
      });
  };
};

const createNewUser = () => {
  const tryToCreateNewUser = async (firstName, lastName, dispatch) => {
    const token = userPropsUtilities.getTokenFromStorage();
    commonTasks.checkAndExecute(!token, () => {
      dispatch(commonActions.changeViewMode.signIn());
      printTokenNotFound();
    });

    const {
      data: { user },
    } = await apiManager.apis.createNewUser.sendFullFeaturedRequest(
      {
        firstName,
        lastName,
      },
      { token }
    );

    return user;
  };
  const executeIfNoErrorOnTryToCreateNewUser = (user, dispatch) => {
    const token = user.token;
    delete user.token;

    userPropsUtilities.removeTokenFromStorage();
    dispatch(actions.updateAllUserData(user));
    dispatch(commonActions.changeViewMode.messenger());

    saveTokenIntoPersistentStorage(token);
  };

  return async (dispatch, getState = store.initialStates) => {
    const {
      auth: { firstName, lastName },
    } = getState();

    dispatch(commonActions.changeAuthenticationProgress(true));

    (
      await trier(createNewUser.name).tryAsync(
        tryToCreateNewUser,
        firstName,
        lastName,
        dispatch
      )
    )
      .executeIfNoError(executeIfNoErrorOnTryToCreateNewUser, dispatch)
      .printError();

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
