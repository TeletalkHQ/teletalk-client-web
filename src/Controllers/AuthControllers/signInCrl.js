import { signInAPI } from "~/APIs/AuthenticationApis/signInApi";

import { getInitialState } from "~/Variables/Constants/Initials/InitialStates/initialStates";
import { INITIAL_VIEW_MODE } from "~/Variables/Constants/Initials/InitialValues/initialValues";

import { loadingAction, userAction } from "~/Actions/UserActions/userActions";
import { viewModeAction } from "~/Actions/GlobalActions/globalActions";
import { PersistentStorage } from "~/Functions/Utils/PersistentStorage";

const signInCrl = () => {
  return async (dispatch, getState = getInitialState) => {
    try {
      const {
        user: { phoneNumber, countryCode, countryName },
      } = getState();

      dispatch(loadingAction({ loading: true }));

      const response = await signInAPI({
        phoneNumber,
        countryCode,
        countryName,
      });

      const verifyToken = response.data.token;

      PersistentStorage.setItem({ key: "verifyToken", value: verifyToken });

      dispatch(
        userAction({
          ...response.data,
        })
      );

      dispatch(viewModeAction({ viewMode: INITIAL_VIEW_MODE.VERIFY_SIGN_IN }));

      return response;
    } catch (error) {
      console.log("signInCrl catch", error);
    } finally {
      dispatch(loadingAction({ loading: false }));
    }
  };
};

export { signInCrl };
