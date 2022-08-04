import { otherActions } from "actions/otherActions";

import { getCountriesApi } from "apis/otherApis";

const getCountriesController = () => {
  return async (dispatch) => {
    try {
      const {
        data: { countries },
      } = await getCountriesApi.sendRequest();

      dispatch(otherActions.getCountriesAction({ countries }));
    } catch (error) {
      console.log("getCountriesController catch, error:", error);
    }
  };
};

export { getCountriesController };
