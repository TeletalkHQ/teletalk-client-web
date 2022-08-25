import { notificationManager } from "classes/NotificationManager";
import { userPropsUtilities } from "classes/UserPropsUtilities";
import { commonFunctionalities } from "classes/CommonFunctionalities";
import { apiManager } from "classes/apiClasses/ApiManager";

import { authenticationProgressChange } from "functions/utilities/commonActions";
import { printCatchError } from "functions/utilities/otherUtilities";

import { getInitialState } from "variables/initials/initialStates/initialStates";
import { notifications } from "variables/otherVariables/notifications";

const createNewUserController = () => {
  return async (dispatch, getState = getInitialState) => {
    const {
      tempState: { firstName, lastName },
    } = getState();

    try {
      dispatch(authenticationProgressChange(true));

      const verifyToken = userPropsUtilities.getVerifyTokenFromStorage();

      if (!verifyToken) {
        commonFunctionalities.changeViewMode().signIn();

        notificationManager.submitErrorNotification(
          notifications.localErrors.VERIFY_TOKEN_NOT_FOUND
        );
      }

      await apiManager.apis.authApis.createNewUserApi.sendFullFeaturedRequest(
        {
          firstName,
          lastName,
        },
        { token: verifyToken }
      );

      userPropsUtilities.removeVerifyTokenFromStorage();

      dispatch(commonFunctionalities.changeViewMode().messenger());
    } catch (error) {
      printCatchError(createNewUserController.name, error);
    } finally {
      dispatch(authenticationProgressChange(false));
    }
  };
};

export { createNewUserController };
