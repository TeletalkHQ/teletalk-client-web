import { logoutApi } from "apis/authenticationApis";

import { commonFunctionalities } from "classes/CommonFunctionalities";

const logoutController = () => {
  return async () => {
    try {
      await logoutApi.sendRequest();

      commonFunctionalities.resetEverything();
    } catch (error) {
      console.log("logoutController catch, error:", error);
    }
  };
};

export { logoutController };
