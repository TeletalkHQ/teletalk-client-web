import { actionCreator } from "functions/utilities/stateUtils";

import { actions } from "variables/initials/initialActions/initialActions";

const {
  userInitialActions: { userInitialAction },
} = actions;

const userAction = (payload = userInitialAction.payload) =>
  actionCreator(userInitialAction.type, payload);

const userActions = { userAction };

export { userActions };
