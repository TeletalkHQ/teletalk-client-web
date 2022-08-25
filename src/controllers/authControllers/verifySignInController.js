import { tempActions } from "actions/tempActions";
import { userActions } from "actions/userActions";

import { apiManager } from "classes/apiClasses/ApiManager";
import { commonFunctionalities } from "classes/CommonFunctionalities";
import { notificationManager } from "classes/NotificationManager";
import { persistentStorage } from "classes/PersistentStorage";

import { authenticationProgressChange } from "functions/utilities/commonActions";
import { printCatchError } from "functions/utilities/otherUtilities";

import { getInitialState } from "variables/initials/initialStates/initialStates";
import { PERSISTENT_STORAGE_KEYS } from "variables/otherVariables/constants";
import { notifications } from "variables/otherVariables/notifications";

const { updateAllUserDataAction } = userActions;

const verifySignInController = () => {
  return async (dispatch, getState = getInitialState) => {
    const {
      tempState: { verificationCode },
    } = getState();

    try {
      dispatch(authenticationProgressChange(true));

      const verifyToken = persistentStorage.getItem(
        PERSISTENT_STORAGE_KEYS.VERIFY_TOKEN
      );

      if (!verifyToken) {
        commonFunctionalities.changeViewMode().signIn();
        notificationManager.submitErrorNotification(
          notifications.localErrors.VERIFY_TOKEN_NOT_FOUND
        );

        return;
      }

      const response =
        await apiManager.apis.authApis.verifySignInApi.sendFullFeaturedRequest(
          {
            verificationCode,
          },
          { token: verifyToken }
        );

      dispatch(
        tempActions.verificationCodeOnChangeAction({ verificationCode: "" })
      );
      const { user: userData } = response.data;

      if (userData.newUser) {
        commonFunctionalities.changeViewMode().newUserProfile();
      } else {
        persistentStorage.removeItem(PERSISTENT_STORAGE_KEYS.VERIFY_TOKEN);

        console.log(userData);

        const mainToken = userData.mainToken;
        delete userData.mainToken;

        persistentStorage.setItem(
          PERSISTENT_STORAGE_KEYS.MAIN_TOKEN,
          mainToken
        );

        dispatch(updateAllUserDataAction(userData));
        commonFunctionalities.changeViewMode().messenger();
      }
    } catch (error) {
      printCatchError(verifySignInController.name, error);
    } finally {
      dispatch(authenticationProgressChange(false));
    }
  };
};

export { verifySignInController };
