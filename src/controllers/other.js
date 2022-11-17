import { trier } from "utility-store/src/classes/Trier";

import { actions } from "actions/actions";

import { apiManager } from "classes/api/ApiManager";

import { printCatchError } from "functions/utilities/otherUtilities";

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
    (await trier(getWelcomeMessage.name).tryAsync(tryToGetWelcomeMessage))
      .executeIfNoError(executeIfNoErrorOnTryToGetWelcomeMessage, dispatch)
      .catch(printCatchError, getWelcomeMessage.name);
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
    (await trier(getCountries.name).tryAsync(tryToGetCountries))
      .executeIfNoError(executeIfNoErrorOnTryToGetCountries, dispatch)
      .catch(printCatchError, getCountries.name);
  };
};

const otherControllers = {
  getCountries,
  getWelcomeMessage,
};

export { otherControllers };