import { tempActions } from "actions/tempActions";
import { userActions } from "actions/userActions";

import { apiManager } from "classes/apiClasses/ApiManager";
import { notificationManager } from "classes/NotificationManager";
import { persistentStorage } from "classes/PersistentStorage";

import {
  authenticationProgressChange,
  viewModeChange,
} from "functions/utilities/commonActions";

import { getInitialState } from "variables/initials/initialStates/initialStates";
import {
  VIEW_MODES,
  PERSISTENT_STORAGE_KEYS,
} from "variables/others/constants";
import { notifications } from "variables/others/notifications";

const { updateAllUserDataAction } = userActions;

const verifySignInController = () => {
  return async (dispatch, getState = getInitialState) => {
    const {
      tempState: { verificationCode },
    } = getState();

    try {
      dispatch(authenticationProgressChange(true));

      const verifyToken = persistentStorage.getItem(
        PERSISTENT_STORAGE_KEYS.VERIFY_TOKEN
      );

      if (!verifyToken) {
        dispatch(viewModeChange(VIEW_MODES.SIGN_IN));
        notificationManager.submitErrorNotification(
          notifications.localErrors.VERIFY_TOKEN_NOT_FOUND
        );

        return;
      }

      const response =
        await apiManager.apis.authApis.verifySignInApi.sendRequest(
          {
            verificationCode: verificationCode,
          },
          { token: verifyToken }
        );

      dispatch(
        tempActions.verificationCodeOnChangeAction({ verificationCode: "" })
      );

      const { user: userData } = response.data;

      if (userData.newUser) {
        dispatch(viewModeChange(VIEW_MODES.NEW_USER_PROFILE));
      } else {
        persistentStorage.removeItem(PERSISTENT_STORAGE_KEYS.VERIFY_TOKEN);

        console.log(userData);

        const mainToken = userData.mainToken;
        delete userData.mainToken;

        persistentStorage.setItem(
          PERSISTENT_STORAGE_KEYS.MAIN_TOKEN,
          mainToken
        );

        dispatch(updateAllUserDataAction(userData));
        dispatch(viewModeChange(VIEW_MODES.MESSENGER));
      }
    } catch (error) {
      console.log("verifySignInController catch, error:", error);
    } finally {
      dispatch(authenticationProgressChange(false));
    }
  };
};

export { verifySignInController };
