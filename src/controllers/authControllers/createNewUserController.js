import { globalActions } from "actions/globalActions";

import { createNewUserApi } from "apis/authenticationApis";

import { notificationManager } from "classes/NotificationManager";
import { userPropsUtilities } from "classes/UserPropsUtilities";

import { authenticationProgressChange } from "functions/utilities/commonActions";

import { getInitialState } from "variables/initials/initialStates/initialStates";
import { VIEW_MODES } from "variables/others/staticValues";
import { notifications } from "variables/others/notifications";

const { viewModeChangeAction } = globalActions;

const createNewUserController = () => {
  return async (dispatch, getState = getInitialState) => {
    const {
      tempState: { firstName, lastName },
    } = getState();

    try {
      dispatch(authenticationProgressChange(true));

      const verifyToken = userPropsUtilities.getVerifyTokenFromStorage();

      if (!verifyToken) {
        //TODO Move it to common actions
        dispatch(viewModeChangeAction({ viewMode: VIEW_MODES.SIGN_IN }));

        notificationManager.submitErrorNotification(
          notifications.localErrors.VERIFY_TOKEN_NOT_FOUND
        );
      }

      const response = await createNewUserApi.sendRequest(
        {
          firstName,
          lastName,
        },
        { token: verifyToken }
      );

      console.log(response.data);

      userPropsUtilities.removeVerifyTokenFromStorage();

      dispatch(viewModeChangeAction({ viewMode: VIEW_MODES.MESSENGER }));
    } catch (error) {
      console.log("createNewUserController catch, error:", error);
    } finally {
      dispatch(authenticationProgressChange(false));
    }
  };
};

export { createNewUserController };
