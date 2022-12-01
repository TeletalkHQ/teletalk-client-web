import { actionHandler } from "classes/ActionHandler";

import { OTHER_ACTION_TYPES } from "store/other/types";

const getCountries = (payload) =>
  actionHandler(OTHER_ACTION_TYPES.SET_COUNTRIES, payload);

const setWelcomeMessage = (payload) =>
  actionHandler(OTHER_ACTION_TYPES.SET_WELCOME_MESSAGE, payload);

const resetOtherState = () =>
  actionHandler(OTHER_ACTION_TYPES.RESET_OTHER_STATE);

const otherActions = {
  getCountries,
  resetOtherState,
  setWelcomeMessage,
};

export { otherActions };
