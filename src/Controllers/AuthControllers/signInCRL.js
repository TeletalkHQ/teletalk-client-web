import { signInAPI } from "~/APIs/AuthenticationApis/signInApi";

import { initialState } from "~/Variables/Constants/Initials/InitialStates/initialStates";
import { INITIAL_VIEW_MODE } from "~/Variables/Constants/Initials/InitialValues/initialValues";

import { loadingAction, userAction } from "~/Actions/UserActions/userActions";
import { viewModeAction } from "~/Actions/GlobalActions/globalActions";
import { PersistentStorage } from "~/Functions/Utils/PersistentStorage";

const signInCRL = () => {
  return async (dispatch, getState = initialState) => {
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

      dispatch(viewModeAction({ viewMode: INITIAL_VIEW_MODE.verifySignIn }));

      return response;
    } catch (error) {
      console.log("signInCRL catch", error);
    } finally {
      dispatch(loadingAction({ loading: false }));
    }
  };
};

export { signInCRL };
