import { actionCreator } from "functions/utilities/stateUtilities";

import { initialActions } from "variables/initials/initialActions/initialActions";

const {
  otherInitialActions: {
    getCountriesInitialAction,
    welcomeInitialAction,
    resetOtherStateInitialAction,
  },
} = initialActions;

const getCountriesAction = (payload = getCountriesInitialAction.payload) =>
  actionCreator(getCountriesInitialAction.type, payload);

const welcomeMessageAction = (payload = welcomeInitialAction.payload) =>
  actionCreator(welcomeInitialAction.type, payload);

const resetOtherState = () => actionCreator(resetOtherStateInitialAction.type);

const otherActions = {
  getCountriesAction,
  resetOtherState,
  welcomeMessageAction,
};

export { otherActions };
