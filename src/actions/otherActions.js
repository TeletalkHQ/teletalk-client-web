import { actionCreator } from "functions/utilities/stateUtils";

import { actions } from "variables/initials/initialActions/initialActions";

const { tempInitialActions, otherInitialActions } = actions;

const { getCountriesInitialAction, welcomeInitialAction } = otherInitialActions;

const { selectedCountryInitialAction } = tempInitialActions;

const getCountriesAction = (payload = getCountriesInitialAction.payload) =>
  actionCreator(getCountriesInitialAction.type, payload);

const selectedCountryAction = (
  payload = selectedCountryInitialAction.payload
) => actionCreator(selectedCountryInitialAction.type, payload);

const welcomeAction = (payload = welcomeInitialAction.payload) =>
  actionCreator(welcomeInitialAction.type, payload);

const otherActions = {
  getCountriesAction,
  selectedCountryAction,
  welcomeAction,
};

export { otherActions };
