import { actions } from "actions/actions";

import { apiManager } from "classes/apiClasses/ApiManager";

import { printCatchError } from "functions/utilities/otherUtilities";

const getWelcomeMessage = () => {
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
      printCatchError(getWelcomeMessage.name, error);
    }
  };
};

const otherControllers = { getWelcomeMessage };

export { otherControllers };
