import { initialStates } from "variables/initials/initialStates/initialStates";

const { userState } = initialStates;

const userInitialActions = {
  userInitialAction: {
    payload: userState,
    type: "USER_DATA",
  },
};

export { userInitialActions };
