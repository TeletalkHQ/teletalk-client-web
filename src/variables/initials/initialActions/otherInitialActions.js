import { initialStates } from "variables/initials/initialStates";
import { initialContact } from "variables/initials/initialValues/initialValues";

const {
  other: { countries, welcomeMessage },
} = initialStates;

const getCountries = {
  payload: {
    countries,
  },
  type: "GET_COUNTRIES",
};

const selectContact = {
  payload: initialContact,
  type: "SELECT_CONTACT",
};

const setWelcomeMessage = {
  payload: { welcomeMessage },
  type: "WELCOME",
};

const resetOtherState = {
  type: "RESET_OTHER_STATE",
};

const otherInitialActions = {
  getCountries,
  resetOtherState,
  selectContact,
  setWelcomeMessage,
};

export { otherInitialActions };
