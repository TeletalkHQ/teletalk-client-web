import { userActions } from "actions/userActions";
import { globalActions } from "actions/globalActions";

import { userStatusCheckerApi } from "apis/authenticationApis";

import { persistentStorage } from "classes/PersistentStorage";

import { initialStates } from "variables/initials/initialStates/initialStates";
import { VIEW_MODES } from "variables/others/staticValues";

const { userAction } = userActions;

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
        dispatch(
          globalActions.viewModeChangeAction({
            viewMode: VIEW_MODES.SIGN_IN,
          })
        );
      }

      dispatch(userAction({ ...initialStates.userState }));
    } finally {
      dispatch(
        globalActions.globalLoadingStateOpenChangeAction({ open: false })
      );
    }
  };
};

export { userStatusCheckerController };
