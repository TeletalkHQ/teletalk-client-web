import { userActions } from "actions/userActions";

import { apiManager } from "classes/apiClasses/ApiManager";
import { commonFunctionalities } from "classes/CommonFunctionalities";
import { persistentStorage } from "classes/PersistentStorage";

import { authenticationProgressChange } from "functions/utilities/commonActions";
import { printCatchError } from "functions/utilities/otherUtilities";

import { getInitialState } from "variables/initials/initialStates/initialStates";
import { PERSISTENT_STORAGE_KEYS } from "variables/otherVariables/constants";

const { updateAllUserDataAction } = userActions;

const signInController = () => {
  return async (dispatch, getState = getInitialState) => {
    const {
      tempState: { phoneNumber, countryCode, countryName },
    } = getState();

    try {
      dispatch(authenticationProgressChange(true));

      const response =
        await apiManager.apis.authApis.signInApi.sendFullFeaturedRequest({
          countryCode,
          countryName,
          phoneNumber,
        });

      const { verifyToken } = response.data.user;

      persistentStorage.setItem(
        PERSISTENT_STORAGE_KEYS.VERIFY_TOKEN,
        verifyToken
      );

      dispatch(updateAllUserDataAction(response.data.user));

      commonFunctionalities.changeViewMode().verifySignIn();

      return response;
    } catch (error) {
      printCatchError(signInController.name, error);
    } finally {
      dispatch(authenticationProgressChange(false));
    }
  };
};

export { signInController };
