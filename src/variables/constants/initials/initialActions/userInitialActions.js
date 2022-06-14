import { initialState } from "variables/constants/initials/initialStates/initialStates";

const { userInitialState } = initialState;

const userInitialActions = {
  userInitialAction: {
    payload: userInitialState,
    type: "USER_DATA",
  },
};

export { userInitialActions };
