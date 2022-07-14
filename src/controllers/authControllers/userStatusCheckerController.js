import { userAction } from "actions/userActions";
import { backdropAction, viewModeAction } from "actions/globalActions";

import { userStatusCheckerApi } from "apis/authenticationApis";

import { persistentStorage } from "classes/PersistentStorage";

import { initialStates } from "variables/initials/initialStates/initialStates";
import { INITIAL_VIEW_MODE } from "variables/initials/initialValues/initialValues";

const userStatusCheckerController = () => {
  return async (dispatch) => {
    try {
      const response = await userStatusCheckerApi.sendRequest();

      const { user } = response.data;

      delete user.token;

      dispatch(userAction({ ...user }));

      return { user };
    } catch (error) {
      console.log("userStatusCheckerController", error);

      if (error.statusCode === 401) {
        persistentStorage.setDefaultStorage();
        dispatch(viewModeAction({ viewMode: INITIAL_VIEW_MODE.SIGN_IN }));
      }

      dispatch(userAction({ ...initialStates.userState }));
    } finally {
      dispatch(backdropAction({ backdropState: { open: false } }));
    }
  };
};

export { userStatusCheckerController };
