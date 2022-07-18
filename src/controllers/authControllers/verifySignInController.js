import { viewModeAction } from "actions/globalActions";
import { verifyCodeAction } from "actions/tempActions";
import { loadingAction, userAction } from "actions/userActions";

import { verifySignInApi } from "apis/authenticationApis";

import { persistentStorage } from "classes/PersistentStorage";

import { getInitialState } from "variables/initials/initialStates/initialStates";
import {
  INITIAL_VIEW_MODE,
  PERSISTENT_STORAGE_KEYS,
} from "variables/initials/initialValues/initialValues";

const verifySignInController = () => {
  return async (dispatch, getState = getInitialState) => {
    const {
      tempState: { verifyCode },
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
        const error = "verifyToken is not defined";

        dispatch(viewModeAction({ viewMode: INITIAL_VIEW_MODE.SIGN_IN }));

        throw error;
      }

      const response = await verifySignInApi.sendRequest({
        verificationCode: verifyCode,
        token: verifyToken,
      });

      dispatch(verifyCodeAction({ verifyCode: "" }));

      const { user } = response.data;

      if (user.newUser) {
        dispatch(
          viewModeAction({ viewMode: INITIAL_VIEW_MODE.NEW_USER_PROFILE })
        );
      } else {
        persistentStorage.removeItem(PERSISTENT_STORAGE_KEYS.VERIFY_TOKEN);

        const mainToken = user.token;
        delete user.token;

        persistentStorage.setItem(
          PERSISTENT_STORAGE_KEYS.MAIN_TOKEN,
          mainToken
        );

        dispatch(userAction({ ...user }));
        dispatch(viewModeAction({ viewMode: INITIAL_VIEW_MODE.MESSENGER }));
      }
    } catch (error) {
      console.log("verifySignInController", error);
    } finally {
      dispatch(
        loadingAction({ loadingState: { ...loadingState, loading: false } })
      );
    }
  };
};

export { verifySignInController };
