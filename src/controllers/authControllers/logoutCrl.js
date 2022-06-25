import { viewModeAction } from "actions/globalActions";
import { userAction } from "actions/userActions";

import { logoutApi } from "apis/authenticationApis";

import { persistentStorage } from "classes/PersistentStorage";

import { userInitializer } from "functions/helpers/userInitializer";

import { INITIAL_VIEW_MODE } from "variables/initials/initialValues/initialValues";

const logoutCrl = () => {
  return async (dispatch, getState) => {
    try {
      /*const response = */ await logoutApi.sendRequest();

      persistentStorage.setDefaultStorage();

      dispatch(userAction({ ...userInitializer() }));

      dispatch(
        viewModeAction({
          viewMode: INITIAL_VIEW_MODE.SIGN_IN,
        })
      );
    } catch (error) {
      console.log("logoutCrl", error);
    }
  };
};

export { logoutCrl };
