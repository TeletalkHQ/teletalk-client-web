import { actions } from "actions/actions";

import { apiManager } from "classes/apiClasses/ApiManager";

import { printCatchError } from "functions/utilities/otherUtilities";

const getCountriesController = () => {
  return async (dispatch) => {
    try {
      const {
        data: { countries },
      } = await apiManager.apis.getCountries.sendFullFeaturedRequest();
      dispatch(actions.getCountries({ countries }));
    } catch (error) {
      printCatchError(getCountriesController.name, error);
    }
  };
};

export { getCountriesController };
