import { userActions } from "actions/userActions";
import { globalActions } from "actions/globalActions";

import { apiManager } from "classes/apiClasses/ApiManager";

import { printCatchError } from "functions/utilities/otherUtilities";

const { updateAllUserDataAction } = userActions;

const userStatusCheckerController = () => {
  return async (dispatch) => {
    try {
      const response =
        await apiManager.apis.authApis.userStatusCheckerApi.sendRequest();

      const { user } = response.data;

      delete user.mainToken;

      dispatch(updateAllUserDataAction(user));

      return { user };
    } catch (error) {
      printCatchError(userStatusCheckerController.name, error);
    } finally {
      dispatch(
        globalActions.globalLoadingStateOpenChangeAction({ open: false })
      );
    }
  };
};

export { userStatusCheckerController };
