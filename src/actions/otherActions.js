import { actionCreator } from "functions/utilities/stateUtilities";

import { initialActions } from "variables/initials/initialActions/initialActions";

const {
  otherInitialActions: {
    getCountriesInitialAction,
    welcomeInitialAction,
    resetOtherStateInitialAction,
  },
} = initialActions;

const getCountries = (payload = getCountriesInitialAction.payload) =>
  actionCreator(getCountriesInitialAction.type, payload);

const welcomeMessage = (payload = welcomeInitialAction.payload) =>
  actionCreator(welcomeInitialAction.type, payload);

const resetOtherState = () => actionCreator(resetOtherStateInitialAction.type);

const otherActions = {
  getCountries,
  resetOtherState,
  welcomeMessage,
};

export { otherActions };
