import { verifySignInAPI } from "~/APIs/AuthenticationApis/verifySignInApi";

import { loadingAction, userAction } from "~/Actions/UserActions/userActions";
import { viewModeAction } from "~/Actions/GlobalActions/globalActions";

import { initialState } from "~/Variables/Constants/Initials/InitialStates/initialStates";
import { INITIAL_VIEW_MODE } from "~/Variables/Constants/Initials/InitialValues/initialValues";
import { PersistentStorage } from "~/Functions/Utils/PersistentStorage";

const verifySignInCRL = () => {
  return async (dispatch, getState = initialState) => {
    try {
      dispatch(loadingAction({ loading: true }));

      const {
        user: { verifyCode },
      } = getState();

      const verifyToken = PersistentStorage.getItem({ key: "verifyToken" });

      if (!verifyToken) {
        const error = "verifyToken is not defined";

        dispatch(viewModeAction({ viewMode: INITIAL_VIEW_MODE.SIGN_IN }));

        throw error;
      }

      const response = await verifySignInAPI({
        verifyCode,
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
      console.log("verifySignInCRL", error);
    } finally {
      dispatch(loadingAction({ loading: false }));
    }
  };
};

export { verifySignInCRL };
