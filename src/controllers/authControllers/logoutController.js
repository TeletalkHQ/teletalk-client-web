import { apiManager } from "classes/apiClasses/ApiManager";

import { commonFunctionalities } from "classes/CommonFunctionalities";

import { printCatchError } from "functions/utilities/otherUtilities";

const logoutController = () => {
  return async () => {
    try {
      await apiManager.apis.authApis.logoutApi.sendRequest();

      commonFunctionalities.resetEverything();
    } catch (error) {
      printCatchError(logoutController.name, error);
    }
  };
};

export { logoutController };
