import { actionCreator } from "functions/utilities/stateUtils";

import { otherInitialActions } from "variables/initials/initialActions/initialActions";
import { tempInitialActions } from "variables/initials/initialActions/tempInitialActions";

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
