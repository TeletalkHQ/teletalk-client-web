import { getCountriesAction } from "~/Actions/OtherActions/otherActions";

import { getCountriesApi } from "~/Apis/AuthenticationApis/getCountriesApi";

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
