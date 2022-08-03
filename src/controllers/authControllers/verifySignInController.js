import { viewModeAction } from "actions/globalActions";
import { verificationCodeAction } from "actions/tempActions";
import { loadingAction, userAction } from "actions/userActions";

import { verifySignInApi } from "apis/authenticationApis";

import { notificationManager } from "classes/NotificationManager";
import { persistentStorage } from "classes/PersistentStorage";

import { getInitialState } from "variables/initials/initialStates/initialStates";
import {
  INITIAL_VIEW_MODE,
  PERSISTENT_STORAGE_KEYS,
} from "variables/initials/initialValues/initialValues";

import { notifications } from "variables/others/notifications";

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
        dispatch(viewModeAction({ viewMode: INITIAL_VIEW_MODE.SIGN_IN }));
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

      dispatch(verificationCodeAction({ verificationCode: "" }));

      const { user: userData } = response.data;

      if (userData.newUser) {
        dispatch(
          viewModeAction({ viewMode: INITIAL_VIEW_MODE.NEW_USER_PROFILE })
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
        dispatch(viewModeAction({ viewMode: INITIAL_VIEW_MODE.MESSENGER }));
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
