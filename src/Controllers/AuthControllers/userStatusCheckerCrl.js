import { userStatusCheckerApi } from "~/Apis/AuthenticationApis/userStatusCheckerApi";

import { initialState } from "~/Variables/Constants/Initials/InitialStates/initialStates";

import { userAction } from "~/Actions/UserActions/userActions";
import {
  backdropAction,
  viewModeAction,
} from "~/Actions/GlobalActions/globalActions";
import { INITIAL_VIEW_MODE } from "~/Variables/Constants/Initials/InitialValues/initialValues";
import { PersistentStorage } from "~/Functions/Utils/PersistentStorage";

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
