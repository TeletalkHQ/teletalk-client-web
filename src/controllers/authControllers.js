import { trier } from "utility-store/src/classes/Trier";

import { actions } from "actions/actions";

import { apiManager } from "classes/apiClasses/ApiManager";
import { commonFunctionalities } from "classes/CommonFunctionalities";
import { notificationManager } from "classes/NotificationManager";
import { persistentStorage } from "classes/PersistentStorage";
import { userPropsUtilities } from "classes/UserPropsUtilities";

import { authenticationProgressChange } from "functions/utilities/commonActions";
import { printCatchError } from "functions/utilities/otherUtilities";

import { getInitialState } from "variables/initials/initialStates";
import { notifications } from "variables/notifications/notifications";
import { PERSISTENT_STORAGE_KEYS } from "variables/otherVariables/helpers";
import { VIEW_MODES } from "variables/otherVariables/helpers";

const changeViewModeToSignIn = () =>
  commonFunctionalities.changeViewMode().signIn();

const printVerifyTokenNotFound = () =>
  notificationManager.submitErrorNotification(
    notifications.error.VERIFY_TOKEN_NOT_FOUND
  );

const saveUserTokenIntoPersistentStorage = (mainToken) =>
  persistentStorage.setItem(PERSISTENT_STORAGE_KEYS.MAIN_TOKEN, mainToken);

const tryToVerifySignIn = async (verificationCode) => {
  const verifyToken = persistentStorage.getItem(
    PERSISTENT_STORAGE_KEYS.VERIFY_TOKEN
  );
  if (!verifyToken) {
    changeViewModeToSignIn();
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
const tasksIfUserIsNew = () => {
  commonFunctionalities.changeViewMode().createNewUser();
};
const tasksIfUserIsNotNew = (dispatch, user) => {
  persistentStorage.removeItem(PERSISTENT_STORAGE_KEYS.VERIFY_TOKEN);

  const mainToken = user.mainToken;
  delete user.mainToken;

  saveUserTokenIntoPersistentStorage(mainToken);

  dispatch(actions.updateAllUserData(user));
  commonFunctionalities.changeViewMode().messenger();
};
const executeIfNoErrorTryToVerifySignIn = (response, dispatch) => {
  dispatch(actions.verificationCodeOnChange({ verificationCode: "" }));
  const { user } = response.data;

  if (user.newUser) {
    tasksIfUserIsNew();
  } else {
    tasksIfUserIsNotNew(dispatch, user);
  }
};
const verifySignIn = () => {
  return async (dispatch, getState = getInitialState) => {
    const {
      temp: { verificationCode },
    } = getState();

    dispatch(authenticationProgressChange(true));

    (
      await trier(verifySignIn.name).tryAsync(
        tryToVerifySignIn,
        verificationCode
      )
    )
      .executeIfNoError(executeIfNoErrorTryToVerifySignIn, dispatch)
      .catch(printCatchError, verifySignIn.name);

    dispatch(authenticationProgressChange(false));
  };
};

const tryToCheckUserStatus = async () => {
  const {
    data: { user },
  } = await apiManager.apis.checkUserStatus.sendFullFeaturedRequest();

  return { user };
};
const executeIfNoErrorOnTryToCheckUserStatus = ({ user }, dispatch) => {
  dispatch(actions.updateAllUserData(user));
  dispatch(actions.viewModeChange({ viewMode: VIEW_MODES.MESSENGER }));
};
const checkUserStatus = () => {
  return async (dispatch) => {
    (await trier(checkUserStatus.name).tryAsync(tryToCheckUserStatus))
      .executeIfNoError(executeIfNoErrorOnTryToCheckUserStatus, dispatch)
      .catch(() => {
        printCatchError();
        dispatch(actions.viewModeChange({ viewMode: VIEW_MODES.SIGN_IN }));
      }, checkUserStatus.name)
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
  persistentStorage.setItem(PERSISTENT_STORAGE_KEYS.VERIFY_TOKEN, verifyToken);

  dispatch(actions.updateAllUserData(response.data.user));

  commonFunctionalities.changeViewMode().verifySignIn();
};
const signIn = () => {
  return async (dispatch, getState = getInitialState) => {
    const {
      temp: { phoneNumber, countryCode, countryName },
    } = getState();
    dispatch(authenticationProgressChange(true));

    const response = (
      await trier(signIn.name).tryAsync(tryToSignIn, {
        countryCode,
        countryName,
        phoneNumber,
      })
    )
      .executeIfNoError(executeIfNoErrorOnTryToSignIn, dispatch)
      .catch(printCatchError, signIn.name)
      .result();

    dispatch(authenticationProgressChange(false));

    return response;
  };
};

const tryToLogout = async () =>
  await apiManager.apis.logout.sendFullFeaturedRequest();
const logout = () => {
  return async () => {
    (await trier(logout.name).tryAsync(tryToLogout))
      .catch(printCatchError, logout.name)
      .executeIfNoError(() => commonFunctionalities.resetEverything());
  };
};

const tryToCreateNewUser = async (firstName, lastName) => {
  const verifyToken = userPropsUtilities.getVerifyTokenFromStorage();
  commonFunctionalities.checkAndExecute(!verifyToken, () => {
    changeViewModeToSignIn();
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
  userPropsUtilities.removeVerifyTokenFromStorage();
  dispatch(actions.updateAllUserData(user));
  commonFunctionalities.changeViewMode().messenger();
  const mainToken = user.mainToken;
  delete user.mainToken;

  saveUserTokenIntoPersistentStorage(mainToken);
};
const createNewUser = () => {
  return async (dispatch, getState = getInitialState) => {
    const {
      temp: { firstName, lastName },
    } = getState();

    dispatch(authenticationProgressChange(true));

    (
      await trier(createNewUser.name).tryAsync(
        tryToCreateNewUser,
        firstName,
        lastName
      )
    )
      .executeIfNoError(executeIfNoErrorOnTryToCreateNewUser, dispatch)
      .catch(printCatchError, createNewUser.name);

    dispatch(authenticationProgressChange(false));
  };
};

const authControllers = {
  checkUserStatus,
  createNewUser,
  logout,
  signIn,
  verifySignIn,
};

export { authControllers };
