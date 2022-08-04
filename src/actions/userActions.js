import { actionCreator } from "functions/utilities/stateUtils";

import { actions } from "variables/initials/initialActions/initialActions";

const { userInitialActions, globalInitialActions } = actions;

const { userInitialAction } = userInitialActions;
const { loadingInitialAction } = globalInitialActions;

const loadingAction = (payload = loadingInitialAction.payload) =>
  actionCreator(loadingInitialAction.type, payload);

const userAction = (payload = userInitialAction.payload) =>
  actionCreator(userInitialAction.type, payload);

const userActions = { loadingAction, userAction };

export { userActions };
