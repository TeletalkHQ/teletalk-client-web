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

const verifySignIn = () => {
  return async (dispatch, getState = getInitialState) => {
    const {
      temp: { verificationCode },
    } = getState();

    try {
      dispatch(authenticationProgressChange(true));

      const verifyToken = persistentStorage.getItem(
        PERSISTENT_STORAGE_KEYS.VERIFY_TOKEN
      );

      if (!verifyToken) {
        commonFunctionalities.changeViewMode().signIn();
        notificationManager.submitErrorNotification(
          notifications.error.VERIFY_TOKEN_NOT_FOUND
        );

        return;
      }

      const response =
        await apiManager.apis.verifySignIn.sendFullFeaturedRequest(
          {
            verificationCode,
          },
          { token: verifyToken }
        );

      dispatch(actions.verificationCodeOnChange({ verificationCode: "" }));
      const { user: userData } = response.data;

      if (userData.newUser) {
        commonFunctionalities.changeViewMode().newUserProfile();
      } else {
        persistentStorage.removeItem(PERSISTENT_STORAGE_KEYS.VERIFY_TOKEN);

        const mainToken = userData.mainToken;
        delete userData.mainToken;

        persistentStorage.setItem(
          PERSISTENT_STORAGE_KEYS.MAIN_TOKEN,
          mainToken
        );

        dispatch(actions.updateAllUserData(userData));
        commonFunctionalities.changeViewMode().messenger();
      }
    } catch (error) {
      printCatchError(verifySignIn.name, error);
    } finally {
      dispatch(authenticationProgressChange(false));
    }
  };
};

const userStatusChecker = () => {
  return async (dispatch) => {
    try {
      const {
        data: { user },
      } = await apiManager.apis.userStatusChecker.sendFullFeaturedRequest();

      dispatch(actions.updateAllUserData(user));
      dispatch(actions.viewModeChange({ viewMode: VIEW_MODES.MESSENGER }));

      return { user };
    } catch (error) {
      printCatchError(userStatusChecker.name, error);
    } finally {
      dispatch(actions.globalLoadingOpenChange({ open: false }));
    }
  };
};

const signIn = () => {
  return async (dispatch, getState = getInitialState) => {
    const {
      temp: { phoneNumber, countryCode, countryName },
    } = getState();

    try {
      dispatch(authenticationProgressChange(true));

      const response = await apiManager.apis.signIn.sendFullFeaturedRequest({
        countryCode,
        countryName,
        phoneNumber,
      });

      const { verifyToken } = response.data.user;

      persistentStorage.setItem(
        PERSISTENT_STORAGE_KEYS.VERIFY_TOKEN,
        verifyToken
      );

      dispatch(actions.updateAllUserData(response.data.user));

      commonFunctionalities.changeViewMode().verifySignIn();

      return response;
    } catch (error) {
      printCatchError(signIn.name, error);
    } finally {
      dispatch(authenticationProgressChange(false));
    }
  };
};

const logout = () => {
  return async () => {
    try {
      await apiManager.apis.logout.sendFullFeaturedRequest();

      commonFunctionalities.resetEverything();
    } catch (error) {
      printCatchError(logout.name, error);
    }
  };
};

const getCountries = () => {
  return async (dispatch) => {
    try {
      const {
        data: { countries },
      } = await apiManager.apis.getCountries.sendFullFeaturedRequest();
      dispatch(actions.getCountries({ countries }));
    } catch (error) {
      printCatchError(getCountries.name, error);
    }
  };
};

const createNewUser = () => {
  return async (dispatch, getState = getInitialState) => {
    const {
      temp: { firstName, lastName },
    } = getState();

    try {
      dispatch(authenticationProgressChange(true));

      const verifyToken = userPropsUtilities.getVerifyTokenFromStorage();

      commonFunctionalities.checkAndExecute(!verifyToken, () => {
        commonFunctionalities.changeViewMode().signIn();
        notificationManager.submitErrorNotification(
          notifications.error.VERIFY_TOKEN_NOT_FOUND
        );
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

      userPropsUtilities.removeVerifyTokenFromStorage();
      dispatch(actions.updateAllUserData(user));
      commonFunctionalities.changeViewMode().messenger();
    } catch (error) {
      printCatchError(createNewUser.name, error);
    } finally {
      dispatch(authenticationProgressChange(false));
    }
  };
};

const authControllers = {
  createNewUser,
  getCountries,
  logout,
  signIn,
  userStatusChecker,
  verifySignIn,
};

export { authControllers };
