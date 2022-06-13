import { initialState } from "~/variables/constants/initials/initialStates/initialStates";

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
