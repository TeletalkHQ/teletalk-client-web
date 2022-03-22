import { verifySignInApi } from "~/Apis/AuthenticationApis/verifySignInApi";

import { loadingAction, userAction } from "~/Actions/UserActions/userActions";
import { viewModeAction } from "~/Actions/GlobalActions/globalActions";

import { getInitialState } from "~/Variables/Constants/Initials/InitialStates/initialStates";
import { INITIAL_VIEW_MODE } from "~/Variables/Constants/Initials/InitialValues/initialValues";
import { PersistentStorage } from "~/Functions/Utils/PersistentStorage";

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

      const response = await verifySignInApi({
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
      logger.log("verifySignInCrl", error);
    } finally {
      dispatch(loadingAction({ loading: false }));
    }
  };
};

export { verifySignInCrl };
