import { userStatusCheckerApi } from "~/apis/authenticationApis/userStatusCheckerApi";

import { initialState } from "~/variables/constants/initials/initialStates/initialStates";

import { userAction } from "~/actions/userActions/userActions";
import {
  backdropAction,
  viewModeAction,
} from "~/actions/globalActions/globalActions";
import { INITIAL_VIEW_MODE } from "~/variables/constants/initials/initialValues/initialValues";
import { PersistentStorage } from "~/classes/PersistentStorage";

const userStatusCheckerCrl = () => {
  return async (dispatch) => {
    try {
      const response = await userStatusCheckerApi();

      const { user } = response.data;

      delete user.token;

      dispatch(userAction({ ...user }));

      return { user };
    } catch (error) {
      logger.log("userStatusCheckerCrl", error);

      if (error.statusCode === 401) {
        PersistentStorage.clear();
        dispatch(viewModeAction({ viewMode: INITIAL_VIEW_MODE.SIGN_IN }));
      }

      dispatch(userAction({ ...initialState.userInitialState }));
    } finally {
      dispatch(backdropAction({ backdropState: { open: false } }));
    }
  };
};

export { userStatusCheckerCrl };
