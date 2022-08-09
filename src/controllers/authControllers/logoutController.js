import { userActions } from "actions/userActions";

import { logoutApi } from "apis/authenticationApis";

import { persistentStorage } from "classes/PersistentStorage";
import { userPropsUtilities } from "classes/UserPropsUtilities";

import { viewModeChange } from "functions/utilities/commonActions";

import { VIEW_MODES } from "variables/others/staticValues";

const logoutController = () => {
  return async (dispatch) => {
    try {
      /*const response = */ await logoutApi.sendRequest();

      persistentStorage.setDefaultStorage();

      dispatch(
        userActions.userAction({ ...userPropsUtilities.makeDefaultUserState() })
      );

      dispatch(viewModeChange(VIEW_MODES.SIGN_IN));
    } catch (error) {
      console.log("logoutController", error);
    }
  };
};

export { logoutController };
