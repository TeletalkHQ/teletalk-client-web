import { otherActions } from "actions/otherActions";

import { apiManager } from "classes/apiClasses/ApiManager";

import { printCatchError } from "functions/utilities/otherUtilities";

const welcomeMessageController = () => {
  return async (dispatch) => {
    try {
      const { welcomeMessageApi } = apiManager.apis.otherApis;
      const response = await welcomeMessageApi.sendFullFeaturedRequest();

      dispatch(
        otherActions.welcomeMessageAction({
          welcomeMessage: response.data.message,
        })
      );
    } catch (error) {
      printCatchError(welcomeMessageController.name, error);
    }
  };
};

export { welcomeMessageController };
