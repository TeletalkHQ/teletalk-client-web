import { initialStates } from "variables/initials/initialStates/initialStates";

const {
  errorState: { error },
} = initialStates;

const errorInitialActions = {
  econnabortedAction: {
    type: "ECONNABORTED",
    payload: { error },
  },
};

export { errorInitialActions };
