import { userActions } from "actions/userActions";

import { signInApi } from "apis/authenticationApis";

import { persistentStorage } from "classes/PersistentStorage";

import {
  authenticationProgressChange,
  viewModeChange,
} from "functions/utilities/commonActions";

import { getInitialState } from "variables/initials/initialStates/initialStates";
import {
  PERSISTENT_STORAGE_KEYS,
  VIEW_MODES,
} from "variables/others/staticValues";

const { userAction } = userActions;

const signInController = () => {
  return async (dispatch, getState = getInitialState) => {
    const {
      tempState: { phoneNumber, countryCode, countryName },
    } = getState();

    try {
      dispatch(authenticationProgressChange(true));

      const response = await signInApi.sendRequest({
        countryCode,
        countryName,
        phoneNumber,
      });

      const verifyToken = response.data.user.verifyToken;

      persistentStorage.setItem(
        PERSISTENT_STORAGE_KEYS.VERIFY_TOKEN,
        verifyToken
      );

      dispatch(
        userAction({
          ...response.data.user,
        })
      );

      dispatch(viewModeChange(VIEW_MODES.VERIFY_SIGN_IN));

      return response;
    } catch (error) {
      console.log("signInController catch", error);
    } finally {
      dispatch(authenticationProgressChange(false));
    }
  };
};

export { signInController };
