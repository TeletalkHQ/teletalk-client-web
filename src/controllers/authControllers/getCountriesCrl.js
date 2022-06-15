import { getCountriesAction } from "actions/otherActions/otherActions";
import { getCountriesApi } from "apis/otherApis";

const getCountriesCrl = () => {
  return async (dispatch, getState) => {
    try {
      const response = await getCountriesApi.sendRequest();

      dispatch(getCountriesAction({ countries: response.data.countries }));
    } catch (error) {
      console.log("getCountriesCrl", error);
    }
  };
};

export { getCountriesCrl };
