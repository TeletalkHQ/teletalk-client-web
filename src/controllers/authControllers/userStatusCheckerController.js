import { userActions } from "actions/userActions";
import { globalActions } from "actions/globalActions";

import { apiManager } from "classes/ApiManager";
import { commonFunctionalities } from "classes/CommonFunctionalities";
import { userPropsUtilities } from "classes/UserPropsUtilities";

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
      //TODO Add default catch error message to some fn
      console.log("userStatusCheckerController catch, error:", error);

      if (error.statusCode === 401) {
        commonFunctionalities.resetEverything();
      }

      dispatch(
        updateAllUserDataAction(userPropsUtilities.makeDefaultUserState())
      );
    } finally {
      dispatch(
        globalActions.globalLoadingStateOpenChangeAction({ open: false })
      );
    }
  };
};

export { userStatusCheckerController };
