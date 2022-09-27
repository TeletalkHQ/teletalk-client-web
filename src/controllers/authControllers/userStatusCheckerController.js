import { globalActions } from "actions/globalActions";
import { userActions } from "actions/userActions";

import { apiManager } from "classes/apiClasses/ApiManager";

import { printCatchError } from "functions/utilities/otherUtilities";
import { VIEW_MODES } from "variables/otherVariables/constants";

const { updateAllUserDataAction } = userActions;

const userStatusCheckerController = () => {
  return async (dispatch) => {
    try {
      const {
        data: { user },
      } = await apiManager.apis.userStatusChecker.sendFullFeaturedRequest();

      dispatch(updateAllUserDataAction(user));
      dispatch(
        globalActions.viewModeChangeAction({ viewMode: VIEW_MODES.MESSENGER })
      );

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
