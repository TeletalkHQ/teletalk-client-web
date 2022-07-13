import { getCountriesAction } from "actions/otherActions";

import { getCountriesApi } from "apis/otherApis";

const getCountriesCrl = () => {
  return async (dispatch) => {
    try {
      const {
        data: { countries },
      } = await getCountriesApi.sendRequest();

      dispatch(getCountriesAction({ countries }));
    } catch (error) {
      console.log("getCountriesCrl catch, error:", error);
    }
  };
};

export { getCountriesCrl };
