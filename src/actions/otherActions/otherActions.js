import { actionCreator } from "functions/utils/actionCreator";

import { otherInitialActions } from "variables/constants/initials/initialActions/initialActions";
import { tempInitialActions } from "variables/constants/initials/initialActions/tempInitialActions";

const { getCountriesInitialAction, welcomeInitialAction } = otherInitialActions;

const { selectedCountryInitialAction } = tempInitialActions;
const getCountriesAction = (payload = getCountriesInitialAction.payload) =>
  actionCreator(getCountriesInitialAction.type, payload);

const selectedCountryAction = (
  payload = selectedCountryInitialAction.payload
) => actionCreator(selectedCountryInitialAction.type, payload);

const welcomeAction = (payload = welcomeInitialAction.payload) =>
  actionCreator(welcomeInitialAction.type, payload);

export { getCountriesAction, selectedCountryAction, welcomeAction };
