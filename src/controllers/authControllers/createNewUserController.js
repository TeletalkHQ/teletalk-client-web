import { userActions } from "actions/userActions";

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

      commonFunctionalities.checkAndExecute(!verifyToken, () => {
        commonFunctionalities.changeViewMode().signIn();
        notificationManager.submitErrorNotification(
          notifications.localErrors.VERIFY_TOKEN_NOT_FOUND
        );
      });

      const {
        data: { user },
      } = await apiManager.apis.createNewUser.sendFullFeaturedRequest(
        {
          firstName,
          lastName,
        },
        { token: verifyToken }
      );

      userPropsUtilities.removeVerifyTokenFromStorage();
      dispatch(userActions.updateAllUserDataAction(user));
      commonFunctionalities.changeViewMode().messenger();
    } catch (error) {
      printCatchError(createNewUserController.name, error);
    } finally {
      dispatch(authenticationProgressChange(false));
    }
  };
};

export { createNewUserController };
