import { actions } from "actions/actions";

import { apiManager } from "classes/apiClasses/ApiManager";

import { printCatchError } from "functions/utilities/otherUtilities";

import { VIEW_MODES } from "variables/otherVariables/constants";

const userStatusCheckerController = () => {
  return async (dispatch) => {
    try {
      const {
        data: { user },
      } = await apiManager.apis.userStatusChecker.sendFullFeaturedRequest();

      dispatch(actions.updateAllUserData(user));
      dispatch(actions.viewModeChange({ viewMode: VIEW_MODES.MESSENGER }));

      return { user };
    } catch (error) {
      printCatchError(userStatusCheckerController.name, error);
    } finally {
      dispatch(actions.globalLoadingStateOpenChange({ open: false }));
    }
  };
};

export { userStatusCheckerController };
