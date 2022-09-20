import { otherActions } from "actions/otherActions";

import { apiManager } from "classes/apiClasses/ApiManager";

import { printCatchError } from "functions/utilities/otherUtilities";

const getCountriesController = () => {
  return async (dispatch) => {
    try {
      const { getCountriesApi } = apiManager.apis.otherApis;
      const {
        data: { countries },
      } = await getCountriesApi.sendFullFeaturedRequest();
      dispatch(otherActions.getCountriesAction({ countries }));
    } catch (error) {
      printCatchError(getCountriesController.name, error);
    }
  };
};

export { getCountriesController };
