import { otherActions } from "actions/otherActions";

import { welcomeApi } from "apis/otherApis";

const welcomeMessageController = () => {
  return async (dispatch) => {
    try {
      const response = await welcomeApi.sendRequest();

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
