import { globalActions } from "actions/globalActions";
import { userActions } from "actions/userActions";

import { logoutApi } from "apis/authenticationApis";

import { persistentStorage } from "classes/PersistentStorage";
import { userPropsUtilities } from "classes/UserPropsUtilities";

import { VIEW_MODES } from "variables/others/staticValues";

const logoutController = () => {
  return async (dispatch, getState) => {
    try {
      /*const response = */ await logoutApi.sendRequest();

      persistentStorage.setDefaultStorage();

      dispatch(
        userActions.userAction({ ...userPropsUtilities.makeDefaultUserState() })
      );

      dispatch(
        globalActions.viewModeChangeAction({
          viewMode: VIEW_MODES.SIGN_IN,
        })
      );
    } catch (error) {
      console.log("logoutController", error);
    }
  };
};

export { logoutController };
