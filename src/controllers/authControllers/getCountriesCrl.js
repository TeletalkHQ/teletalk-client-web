import { getCountriesAction } from "~/actions/otherActions/otherActions";

import { getCountriesApi } from "~/apis/authenticationApis/getCountriesApi";

const getCountriesCrl = () => {
  return async (dispatch, getState) => {
    try {
      const response = await getCountriesApi();

      dispatch(getCountriesAction({ countries: response.data.countries }));
    } catch (error) {
      logger.log("getCountriesCrl", error);
    }
  };
};

export { getCountriesCrl };
