import { otherActions } from "actions/otherActions";

import { apiManager } from "classes/ApiManager";

const getCountriesController = () => {
  return async (dispatch) => {
    try {
      const {
        data: { countries },
      } = await apiManager.apis.otherApis.getCountriesApi.sendRequest();

      dispatch(otherActions.getCountriesAction({ countries }));
    } catch (error) {
      console.log("getCountriesController catch, error:", error);
    }
  };
};

export { getCountriesController };
