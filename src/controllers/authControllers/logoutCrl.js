import { viewModeAction } from "~/actions/globalActions/globalActions";
import { userAction } from "~/actions/userActions/userActions";
import { logoutApi } from "~/apis/authenticationApis/logoutApi";
import { userInitializer } from "~/functions/helpers/userInitializer";
import { PersistentStorage } from "~/functions/utils/PersistentStorage";
import { INITIAL_VIEW_MODE } from "~/variables/constants/initials/initialValues/initialValues";

const logoutCrl = () => {
  return async (dispatch, getState) => {
    try {
      /*const response = */ await logoutApi();

      PersistentStorage.clear();

      dispatch(userAction({ ...userInitializer() }));

      dispatch(
        viewModeAction({
          viewMode: INITIAL_VIEW_MODE.SIGN_IN,
        })
      );
    } catch (error) {
      logger.log("logoutCrl", error);
    }
  };
};

export { logoutCrl };
