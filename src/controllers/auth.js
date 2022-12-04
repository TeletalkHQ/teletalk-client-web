import { trier } from "utility-store/src/classes/Trier";

import { actions } from "store/actions";

import { apiManager } from "classes/api/ApiManager";
import { commonTasks } from "classes/CommonTasks";
import { notificationManager } from "classes/NotificationManager";
import { persistentStorage } from "classes/PersistentStorage";
import { userPropsUtilities } from "classes/UserPropsUtilities";

import { controllers } from "controllers";

import { utilities } from "utilities";

import { extractedDispatchAsync } from "hooks/useThunkReducer";

import { store } from "store/store";
import { commonActions } from "store/commonActions";

import { variables } from "variables";

const printVerifyTokenNotFound = () =>
  notificationManager.submitErrorNotification(
    variables.notification.error.VERIFY_TOKEN_NOT_FOUND
  );

const saveUserTokenIntoPersistentStorage = (mainToken) =>
  persistentStorage.setItem(
    persistentStorage.storageKeys.MAIN_TOKEN,
    mainToken
  );

const tryToVerifySignIn = async (verificationCode, dispatch) => {
  const verifyToken = persistentStorage.getItem(
    persistentStorage.storageKeys.VERIFY_TOKEN
  );
  if (!verifyToken) {
    dispatch(commonActions.changeViewMode.signIn());
    printVerifyTokenNotFound();
    return;
  }

  return await apiManager.apis.verifySignIn.sendFullFeaturedRequest(
    {
      verificationCode,
    },
    { token: verifyToken }
  );
};

const tasksIfUserIsNotNew = (dispatch, user) => {
  persistentStorage.removeItem(persistentStorage.storageKeys.VERIFY_TOKEN);

  const mainToken = user.mainToken;
  delete user.mainToken;
  delete user.newUser;

  saveUserTokenIntoPersistentStorage(mainToken);

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
const verifySignIn = () => {
  return async (dispatch, getState = store.initialState) => {
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
      .catch(utilities.printCatchError, verifySignIn.name);

    dispatch(commonActions.changeAuthenticationProgress(false));
  };
};

const tryToCheckUserStatus = async () => {
  const {
    data: { user },
  } = await apiManager.apis.getUserData.sendFullFeaturedRequest();
  await extractedDispatchAsync(controllers.getAllPrivateChats());

  return { user };
};
const executeIfNoErrorOnTryToCheckUserStatus = ({ user }, dispatch) => {
  delete user.mainToken;
  dispatch(actions.updateAllUserData(user));
  dispatch(commonActions.changeViewMode.messenger());
};
const getUserData = () => {
  return async (dispatch) => {
    if (!localStorage.getItem("MAIN_TOKEN")) {
      return;
    }

    (await trier(getUserData.name).tryAsync(tryToCheckUserStatus))
      .executeIfNoError(executeIfNoErrorOnTryToCheckUserStatus, dispatch)
      .catch(() => {
        utilities.printCatchError();
      }, getUserData.name)
      .finally(() =>
        dispatch(actions.globalLoadingOpenChange({ open: false }))
      );
  };
};

const tryToSignIn = async ({ countryCode, countryName, phoneNumber }) => {
  return await apiManager.apis.signIn.sendFullFeaturedRequest({
    countryCode,
    countryName,
    phoneNumber,
  });
};
const executeIfNoErrorOnTryToSignIn = (response, dispatch) => {
  const { verifyToken } = response.data.user;
  persistentStorage.setItem(
    persistentStorage.storageKeys.VERIFY_TOKEN,
    verifyToken
  );

  dispatch(commonActions.changeViewMode.verifySignIn());
};
const signIn = () => {
  return async (dispatch, getState = store.initialState) => {
    const {
      auth: { phoneNumber, countryCode, countryName },
    } = getState();
    dispatch(commonActions.changeAuthenticationProgress(true));

    const response = (
      await trier(signIn.name).tryAsync(tryToSignIn, {
        countryCode,
        countryName,
        phoneNumber,
      })
    )
      .executeIfNoError(executeIfNoErrorOnTryToSignIn, dispatch)
      .catch(utilities.printCatchError, signIn.name)
      .result();

    dispatch(commonActions.changeAuthenticationProgress(false));

    return response;
  };
};

const tryToLogout = async () =>
  await apiManager.apis.logout.sendFullFeaturedRequest();
const logout = () => {
  return async () => {
    (await trier(logout.name).tryAsync(tryToLogout))
      .catch(utilities.printCatchError, logout.name)
      .executeIfNoError(() => commonTasks.resetEverything());
  };
};

const tryToCreateNewUser = async (firstName, lastName, dispatch) => {
  const verifyToken = userPropsUtilities.getVerifyTokenFromStorage();
  commonTasks.checkAndExecute(!verifyToken, () => {
    dispatch(commonActions.changeViewMode.signIn());
    printVerifyTokenNotFound();
  });

  const {
    data: { user },
  } = await apiManager.apis.createNewUser.sendFullFeaturedRequest(
    {
      firstName,
      lastName,
    },
    { token: verifyToken }
  );

  return user;
};
const executeIfNoErrorOnTryToCreateNewUser = (user, dispatch) => {
  const mainToken = user.mainToken;
  delete user.mainToken;

  userPropsUtilities.removeVerifyTokenFromStorage();
  dispatch(actions.updateAllUserData(user));
  dispatch(commonActions.changeViewMode.messenger());

  saveUserTokenIntoPersistentStorage(mainToken);
};
const createNewUser = () => {
  return async (dispatch, getState = store.initialState) => {
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
      .catch(utilities.printCatchError, createNewUser.name);

    dispatch(commonActions.changeAuthenticationProgress(false));
  };
};

const authControllers = {
  getUserData,
  createNewUser,
  logout,
  signIn,
  verifySignIn,
};

export { authControllers };
