import { initialStates } from "variables/initials/initialStates/initialStates";

const { userState } = initialStates;

const userInitialAction = {
  payload: userState,
  type: "USER_DATA",
};

const userInitialActions = {
  userInitialAction,
};

export { userInitialActions };
