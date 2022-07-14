import { initialStates } from "variables/initials/initialStates/initialStates";

const {
  errorState: { error },
} = initialStates;

const errorInitialActions = {
  eConnAbortedAction: {
    type: "ECONNABORTED",
    payload: { error },
  },
};

export { errorInitialActions };
