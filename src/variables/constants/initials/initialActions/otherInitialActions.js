import { initialState } from "variables/constants/initials/initialStates/initialStates";
import { initialContact } from "variables/constants/initials/initialValues/initialValues";

const {
  otherInitialState: { welcome, countries },
} = initialState;

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
