import { initialStates } from "variables/initials/initialStates/initialStates";
import { initialContact } from "variables/initials/initialValues/initialValues";

const {
  otherState: { countries, welcomeMessage },
} = initialStates;

const getCountriesInitialAction = {
  payload: {
    countries,
  },
  type: "GET_COUNTRIES",
};

const selectContactInitialAction = {
  payload: initialContact,
  type: "SELECT_CONTACT",
};

const welcomeInitialAction = {
  payload: { welcomeMessage },
  type: "WELCOME",
};

const resetOtherStateInitialAction = {
  type: "RESET_OTHER_STATE",
};

const otherInitialActions = {
  getCountriesInitialAction,
  resetOtherStateInitialAction,
  selectContactInitialAction,
  welcomeInitialAction,
};

export { otherInitialActions };
