import { trier } from "utility-store/src/classes/Trier";

import { actions } from "src/store/actions";

import { apiManager } from "src/classes/api/ApiManager";

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
const getWelcomeMessage = () => {
  return async (dispatch) => {
    await trier(getWelcomeMessage.name)
      .tryAsync(tryToGetWelcomeMessage)
      .executeIfNoError(executeIfNoErrorOnTryToGetWelcomeMessage, dispatch)
      .throw()
      .runAsync();
  };
};

const tryToGetCountries = async () => {
  const {
    data: { countries },
  } = await apiManager.apis.getCountries.sendFullFeaturedRequest();
  return countries;
};
const executeIfNoErrorOnTryToGetCountries = (countries, dispatch) => {
  dispatch(actions.getCountries({ countries }));
};
const getCountries = () => {
  return async (dispatch) => {
    await trier(getCountries.name)
      .tryAsync(tryToGetCountries)
      .executeIfNoError(executeIfNoErrorOnTryToGetCountries, dispatch)
      .runAsync();
  };
};

const otherControllers = {
  getCountries,
  getWelcomeMessage,
};

export { otherControllers };
