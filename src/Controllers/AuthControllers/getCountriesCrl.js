import { getCountriesAction } from "~/Actions/OtherActions/otherActions";

import { getCountriesAPI } from "~/APIs/AuthenticationApis/getCountriesApi";

const getCountriesCrl = () => {
  return async (dispatch, getState) => {
    try {
      const response = await getCountriesAPI();

      dispatch(getCountriesAction({ countries: response.data.countries }));
    } catch (error) {
      console.log("getCountriesCrl", error);
    }
  };
};

export { getCountriesCrl };
