import { notificationManager } from "classes/NotificationManager";
import { userPropsUtilities } from "classes/UserPropsUtilities";
import { apiManager } from "classes/apiClasses/ApiManager";

import {
  authenticationProgressChange,
  viewModeChange,
} from "functions/utilities/commonActions";

import { getInitialState } from "variables/initials/initialStates/initialStates";
import { VIEW_MODES } from "variables/others/constants";
import { notifications } from "variables/others/notifications";

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
        dispatch(viewModeChange(VIEW_MODES.SIGN_IN));

        notificationManager.submitErrorNotification(
          notifications.localErrors.VERIFY_TOKEN_NOT_FOUND
        );
      }

      const response =
        await apiManager.apis.authApis.createNewUserApi.sendRequest(
          {
            firstName,
            lastName,
          },
          { token: verifyToken }
        );

      console.log(response.data);

      userPropsUtilities.removeVerifyTokenFromStorage();

      dispatch(viewModeChange(VIEW_MODES.MESSENGER));
    } catch (error) {
      console.log("createNewUserController catch, error:", error);
    } finally {
      dispatch(authenticationProgressChange(false));
    }
  };
};

export { createNewUserController };
