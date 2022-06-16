import { getInitialState } from "variables/constants/initials/initialStates/initialStates";
import { INITIAL_VIEW_MODE } from "variables/constants/initials/initialValues/initialValues";

import { loadingAction, userAction } from "actions/userActions/userActions";
import { viewModeAction } from "actions/globalActions/globalActions";
import { PersistentStorage } from "classes/PersistentStorage";
import { signInApi } from "apis/authenticationApis";

const signInCrl = () => {
  return async (dispatch, getState = getInitialState) => {
    try {
      const {
        tempState: { phoneNumber, countryCode, countryName },
      } = getState();

      dispatch(loadingAction({ loading: true }));

      const response = await signInApi.sendRequest({
        phoneNumber,
        countryCode,
        countryName,
      });

      const verifyToken = response.data.user.verifyToken;

      console.log("rm", response.data);

      PersistentStorage.setItem({ key: "verifyToken", value: verifyToken });

      dispatch(
        userAction({
          ...response.data.user,
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
