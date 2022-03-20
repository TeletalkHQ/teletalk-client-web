import { viewModeAction } from "~/Actions/GlobalActions/globalActions";
import { userAction } from "~/Actions/UserActions/userActions";
import { logoutAPI } from "~/APIs/AuthenticationApis/logoutApi";
import { userInitializer } from "~/Functions/Helpers/userInitializer";
import { PersistentStorage } from "~/Functions/Utils/PersistentStorage";
import { INITIAL_VIEW_MODE } from "~/Variables/Constants/Initials/InitialValues/initialValues";

const logoutCrl = () => {
  return async (dispatch, getState) => {
    try {
      /*const response = */ await logoutAPI();

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