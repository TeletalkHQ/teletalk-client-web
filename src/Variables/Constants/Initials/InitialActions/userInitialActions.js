import { initialState } from "~/Variables/Constants/Initials/InitialStates/initialStates";

const { userInitialState } = initialState;

const userInitialActions = {
  userInitialAction: {
    payload: userInitialState,
    type: "USER_DATA",
  },
};

export { userInitialActions };
