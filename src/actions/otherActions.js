import { actionCreator } from "functions/utilities/stateUtils";

import { actions } from "variables/initials/initialActions/initialActions";

const {
  otherInitialActions: { getCountriesInitialAction, welcomeInitialAction },
} = actions;

const getCountriesAction = (payload = getCountriesInitialAction.payload) =>
  actionCreator(getCountriesInitialAction.type, payload);

const welcomeMessageAction = (payload = welcomeInitialAction.payload) =>
  actionCreator(welcomeInitialAction.type, payload);

const otherActions = {
  getCountriesAction,
  welcomeMessageAction,
};

export { otherActions };
