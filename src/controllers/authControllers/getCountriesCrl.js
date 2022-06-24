import { getCountriesAction } from "actions/otherActions";

import { getCountriesApi } from "apis/otherApis";

const getCountriesCrl = () => {
  return async (dispatch) => {
    try {
      const response = await getCountriesApi.sendRequest();

      dispatch(getCountriesAction({ countries: response.data.countries }));
    } catch (error) {
      console.log("getCountriesCrl", error);
    }
  };
};

export { getCountriesCrl };
