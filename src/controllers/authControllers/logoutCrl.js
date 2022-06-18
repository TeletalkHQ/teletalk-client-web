import { viewModeAction } from "actions/globalActions/globalActions";
import { userAction } from "actions/userActions/userActions";
import { userInitializer } from "functions/helpers/userInitializer";
import { PersistentStorage } from "classes/PersistentStorage";
import { INITIAL_VIEW_MODE } from "variables/initials/initialValues/initialValues";
import { logoutApi } from "apis/authenticationApis";

const logoutCrl = () => {
  return async (dispatch, getState) => {
    try {
      /*const response = */ await logoutApi.sendRequest();

      PersistentStorage.clear();

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
