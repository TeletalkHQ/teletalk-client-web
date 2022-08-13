import { otherActions } from "actions/otherActions";

import { apiManager } from "classes/apiClasses/ApiManager";

const welcomeMessageController = () => {
  return async (dispatch) => {
    try {
      const { welcomeMessageApi } = apiManager.apis.otherApis;
      const response = await welcomeMessageApi.sendRequest();

      dispatch(
        otherActions.welcomeMessageAction({
          welcomeMessage: response.data.message,
        })
      );
    } catch (error) {
      console.log("welcomeMessageController catch, error:", error);
    }
  };
};

export { welcomeMessageController };
