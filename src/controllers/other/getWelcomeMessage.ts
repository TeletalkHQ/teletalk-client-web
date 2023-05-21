import { trier } from "simple-trier";

import { actions } from "~/store/actions";

import { apiManager } from "~/classes/api/ApiManager";

const getWelcomeMessage = () => {
  return async (dispatch) => {
    await trier(getWelcomeMessage.name)
      .tryAsync(tryToGetWelcomeMessage)
      .executeIfNoError(executeIfNoErrorOnTryToGetWelcomeMessage, dispatch)
      .throw()
      .runAsync();
  };
};

const tryToGetWelcomeMessage = async () => {
  return await apiManager.apis.getWelcomeMessage.sendFullFeaturedRequest();
};

const executeIfNoErrorOnTryToGetWelcomeMessage = (response, dispatch) => {
  dispatch(
    actions.setWelcomeMessage({
      welcomeMessage: response.data.message,
    })
  );
};

export { getWelcomeMessage };
