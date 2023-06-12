import { OTHER_ACTION_TYPES } from "~/store/other/types";

const getCountries = (payload) =>
  actionHandler(OTHER_ACTION_TYPES.SET_COUNTRIES, payload);

const resetOtherState = () =>
  actionHandler(OTHER_ACTION_TYPES.RESET_OTHER_STATE);

const setWelcomeMessage = (payload) =>
  actionHandler(OTHER_ACTION_TYPES.SET_WELCOME_MESSAGE, payload);

const isStuffImported = (payload) =>
  actionHandler(OTHER_ACTION_TYPES.IS_STUFF_IMPORTED, payload);

const otherActions = {
  getCountries,
  resetOtherState,
  setWelcomeMessage,
  isStuffImported,
};

export { otherActions };
