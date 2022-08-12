import { apiManager } from "classes/ApiManager";

import { commonFunctionalities } from "classes/CommonFunctionalities";

const logoutController = () => {
  return async () => {
    try {
      await apiManager.apis.authApis.logoutApi.sendRequest();

      commonFunctionalities.resetEverything();
    } catch (error) {
      console.log("logoutController catch, error:", error);
    }
  };
};

export { logoutController };
