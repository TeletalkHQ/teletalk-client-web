import { otherActions } from "actions/otherActions";

import { apiManager } from "classes/ApiManager";

const welcomeMessageController = () => {
  return async (dispatch) => {
    try {
      const response =
        await apiManager.apis.otherApis.welcomeMessageApi.sendRequest();

      dispatch(
        otherActions.welcomeMessageAction({
          welcomeMessage: response.data.message,
        })
      );
    } catch (error) {
      console.log("welcomeMessageController catch", error);
    }
  };
};

export { welcomeMessageController };
