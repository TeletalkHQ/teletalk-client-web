import { trier } from "utility-store/src/classes/Trier";

import { actions } from "src/store/actions";

import { apiManager } from "src/classes/api/ApiManager";

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
