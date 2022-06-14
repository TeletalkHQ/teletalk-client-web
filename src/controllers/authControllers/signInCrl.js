import { signInApi } from "~/apis/authenticationApis/signInApi";

import { getInitialState } from "~/variables/constants/initials/initialStates/initialStates";
import { INITIAL_VIEW_MODE } from "~/variables/constants/initials/initialValues/initialValues";

import { loadingAction, userAction } from "~/actions/userActions/userActions";
import { viewModeAction } from "~/actions/globalActions/globalActions";
import { PersistentStorage } from "~/functions/utils/PersistentStorage";

const signInCrl = () => {
  return async (dispatch, getState = getInitialState) => {
    try {
      const {
        tempState: { phoneNumber, countryCode, countryName },
      } = getState();

      dispatch(loadingAction({ loading: true }));

      const response = await signInApi({
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
      logger.log("signInCrl catch", error);
    } finally {
      dispatch(loadingAction({ loading: false }));
    }
  };
};

export { signInCrl };