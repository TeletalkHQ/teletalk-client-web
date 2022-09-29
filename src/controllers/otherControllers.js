import { actions } from "actions/actions";

import { apiManager } from "classes/apiClasses/ApiManager";

import { printCatchError } from "functions/utilities/otherUtilities";

const getWelcomeMessage = () => {
  return async (dispatch) => {
    try {
      const response =
        await apiManager.apis.getWelcomeMessage.sendFullFeaturedRequest();

      dispatch(
        actions.setWelcomeMessage({
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
