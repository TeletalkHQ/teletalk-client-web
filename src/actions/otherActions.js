import { actionCreator } from "functions/utilities/stateUtilities";

import { initialActions } from "variables/initials/initialActions";

const getCountries = (payload = initialActions.getCountries.payload) =>
  actionCreator(initialActions.getCountries.type, payload);

const setWelcomeMessage = (
  payload = initialActions.setWelcomeMessage.payload
) => actionCreator(initialActions.setWelcomeMessage.type, payload);

const resetOtherState = () =>
  actionCreator(initialActions.resetOtherState.type);

const otherActions = {
  getCountries,
  resetOtherState,
  setWelcomeMessage,
};

export { otherActions };
