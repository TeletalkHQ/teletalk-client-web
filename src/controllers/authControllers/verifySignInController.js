import { globalActions } from "actions/globalActions";
import { tempActions } from "actions/tempActions";
import { userActions } from "actions/userActions";

import { verifySignInApi } from "apis/authenticationApis";

import { notificationManager } from "classes/NotificationManager";
import { persistentStorage } from "classes/PersistentStorage";

import { getInitialState } from "variables/initials/initialStates/initialStates";
import {
  VIEW_MODES,
  PERSISTENT_STORAGE_KEYS,
} from "variables/others/staticValues";

import { notifications } from "variables/others/notifications";

const { viewModeChangeAction } = globalActions;
const { loadingAction, userAction } = userActions;

const verifySignInController = () => {
  return async (dispatch, getState = getInitialState) => {
    const {
      tempState: { verificationCode },
      globalState: { loadingState },
    } = getState();

    try {
      dispatch(
        loadingAction({ loadingState: { ...loadingState, loading: true } })
      );

      const verifyToken = persistentStorage.getItem(
        PERSISTENT_STORAGE_KEYS.VERIFY_TOKEN
      );

      if (!verifyToken) {
        dispatch(viewModeChangeAction({ viewMode: VIEW_MODES.SIGN_IN }));
        notificationManager.submitErrorNotification(
          notifications.localErrors.VERIFY_TOKEN_NOT_FOUND
        );

        return;
      }

      const response = await verifySignInApi.sendRequest(
        {
          verificationCode: verificationCode,
        },
        { token: verifyToken }
      );

      dispatch(tempActions.verificationCodeAction({ verificationCode: "" }));

      const { user: userData } = response.data;

      if (userData.newUser) {
        dispatch(
          viewModeChangeAction({ viewMode: VIEW_MODES.NEW_USER_PROFILE })
        );
      } else {
        persistentStorage.removeItem(PERSISTENT_STORAGE_KEYS.VERIFY_TOKEN);

        const mainToken = userData.token;
        delete userData.token;

        persistentStorage.setItem(
          PERSISTENT_STORAGE_KEYS.MAIN_TOKEN,
          mainToken
        );

        dispatch(userAction(userData));
        dispatch(viewModeChangeAction({ viewMode: VIEW_MODES.MESSENGER }));
      }
    } catch (error) {
      console.log("verifySignInController catch, error:", error);
    } finally {
      dispatch(
        loadingAction({ loadingState: { ...loadingState, loading: false } })
      );
    }
  };
};

export { verifySignInController };
