import { initialStates } from "variables/initials/initialStates/initialStates";
import { initialContact } from "variables/initials/initialValues/initialValues";

const {
  otherState: { welcome, countries },
} = initialStates;

const otherInitialActions = {
  getCountriesInitialAction: {
    type: "GET_COUNTRIES",
    payload: {
      countries,
    },
  },

  selectContactInitialAction: {
    type: "SELECT_CONTACT",
    payload: initialContact,
  },

  welcomeInitialAction: {
    type: "WELCOME",
    payload: welcome,
  },
};

export { otherInitialActions };
