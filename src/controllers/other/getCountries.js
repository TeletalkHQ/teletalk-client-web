import { trier } from "utility-store/src/classes/Trier";

import { apiManager } from "src/classes/api/ApiManager";

import { actions } from "src/store/actions";

const getCountries = () => {
  return async (dispatch) => {
    await trier(getCountries.name)
      .tryAsync(tryToGetCountries)
      .executeIfNoError(executeIfNoErrorOnTryToGetCountries, dispatch)
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

export { getCountries };
