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

const otherInitialActions = {
  getCountriesInitialAction,
  selectContactInitialAction,
  welcomeInitialAction,
};

export { otherInitialActions };
