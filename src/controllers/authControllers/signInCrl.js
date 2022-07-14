import { loadingAction, userAction } from "actions/userActions";
import { viewModeAction } from "actions/globalActions";

import { signInApi } from "apis/authenticationApis";

import { persistentStorage } from "classes/PersistentStorage";

import { getInitialState } from "variables/initials/initialStates/initialStates";
import {
  INITIAL_VIEW_MODE,
  PERSISTENT_STORAGE_KEYS,
} from "variables/initials/initialValues/initialValues";

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

      persistentStorage.setItem(
        PERSISTENT_STORAGE_KEYS.VERIFY_TOKEN,
        verifyToken
      );

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
