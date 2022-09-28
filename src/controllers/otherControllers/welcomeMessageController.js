import { actions } from "actions/actions";

import { apiManager } from "classes/apiClasses/ApiManager";

import { printCatchError } from "functions/utilities/otherUtilities";

const getWelcomeMessageController = () => {
  return async (dispatch) => {
    try {
      const { getWelcomeMessage: getWelcomeMessageApi } = apiManager.apis;
      const response = await getWelcomeMessageApi.sendFullFeaturedRequest();

      dispatch(
        actions.welcomeMessage({
          welcomeMessage: response.data.message,
        })
      );
    } catch (error) {
      printCatchError(getWelcomeMessageController.name, error);
    }
  };
};

export { getWelcomeMessageController };
