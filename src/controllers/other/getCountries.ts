import { trier } from "simple-trier";

import { actions } from "~/store/actions";

const getCountries = () => {
  return async (dispatch) => {
    await trier(getCountries.name)
      .tryAsync(tryBlock)
      .executeIfNoError(executeIfNoError, dispatch)
      .runAsync();
  };
};

const tryBlock = async () => {
  const {
    data: { countries },
  } = await apiManager.apis.getCountries.sendFullFeaturedRequest();
  return countries;
};

const executeIfNoError = (countries, dispatch) => {
  const action = actions.getCountries({ countries });
  dispatch(action);
};

export { getCountries };
