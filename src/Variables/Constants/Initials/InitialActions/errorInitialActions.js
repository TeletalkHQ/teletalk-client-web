import { initialState } from "~/Variables/Constants/Initials/InitialStates/initialStates";

const {
  errorInitialState: { error },
} = initialState;

const errorInitialActions = {
  econnabortedAction: {
    type: "ECONNABORTED",
    payload: { error },
  },
};

export { errorInitialActions };
