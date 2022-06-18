import { PersistentStorage } from "classes/PersistentStorage";

import { verifySignInApi } from "apis/authenticationApis";

import { loadingAction, userAction } from "actions/userActions/userActions";
import { viewModeAction } from "actions/globalActions/globalActions";

import { getInitialState } from "variables/initials/initialStates/initialStates";
import { INITIAL_VIEW_MODE } from "variables/initials/initialValues/initialValues";

const verifySignInCrl = () => {
  return async (dispatch, getState = getInitialState) => {
    try {
      dispatch(loadingAction({ loading: true }));

      const {
        tempState: { verifyCode },
      } = getState();

      const verifyToken = PersistentStorage.getItem({ key: "verifyToken" });

      if (!verifyToken) {
        const error = "verifyToken is not defined";

        dispatch(viewModeAction({ viewMode: INITIAL_VIEW_MODE.SIGN_IN }));

        throw error;
      }

      const response = await verifySignInApi.sendRequest({
        verificationCode: verifyCode,
        token: verifyToken,
      });

      const { user } = response.data;

      if (user.newUser) {
        dispatch(
          viewModeAction({ viewMode: INITIAL_VIEW_MODE.NEW_USER_PROFILE })
        );
      } else {
        PersistentStorage.removeItem({ key: "verifyToken" });

        const mainToken = user.token;
        delete user.token;

        PersistentStorage.setItem({ key: "mainToken", value: mainToken });

        dispatch(userAction({ ...user }));
        dispatch(viewModeAction({ viewMode: INITIAL_VIEW_MODE.MESSENGER }));
      }
    } catch (error) {
      console.log("verifySignInCrl", error);
    } finally {
      dispatch(loadingAction({ loading: false }));
    }
  };
};

export { verifySignInCrl };
