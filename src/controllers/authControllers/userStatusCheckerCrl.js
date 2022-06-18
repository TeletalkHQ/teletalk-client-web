import { initialStates } from "variables/initials/initialStates/initialStates";

import { userAction } from "actions/userActions/userActions";
import {
  backdropAction,
  viewModeAction,
} from "actions/globalActions/globalActions";
import { INITIAL_VIEW_MODE } from "variables/initials/initialValues/initialValues";
import { PersistentStorage } from "classes/PersistentStorage";
import { userStatusCheckerApi } from "apis/authenticationApis";

const userStatusCheckerCrl = () => {
  return async (dispatch) => {
    try {
      const response = await userStatusCheckerApi.sendRequest();

      const { user } = response.data;

      delete user.token;

      dispatch(userAction({ ...user }));

      return { user };
    } catch (error) {
      console.log("userStatusCheckerCrl", error);

      if (error.statusCode === 401) {
        PersistentStorage.clear();
        dispatch(viewModeAction({ viewMode: INITIAL_VIEW_MODE.SIGN_IN }));
      }

      dispatch(userAction({ ...initialStates.userState }));
    } finally {
      dispatch(backdropAction({ backdropState: { open: false } }));
    }
  };
};

export { userStatusCheckerCrl };
