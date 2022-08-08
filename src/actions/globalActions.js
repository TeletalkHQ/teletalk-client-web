import { actionCreator } from "functions/utilities/stateUtils";

import { globalInitialActions } from "variables/initials/initialActions/globalInitialActions";

const {
  appDrawerInitialAction,
  dialogInitialAction,
  globalLoadingOpenChangeInitialAction,
  onlineStatusInitialAction,
  viewModeInitialAction,
} = globalInitialActions;

const viewModeChangeAction = (payload = viewModeInitialAction.payload) =>
  actionCreator(viewModeInitialAction.type, payload);

const appDrawerAction = (payload = appDrawerInitialAction.payload) =>
  actionCreator(appDrawerInitialAction.type, payload);

const dialogAction = (payload = dialogInitialAction.payload) =>
  actionCreator(dialogInitialAction.type, payload);

const globalLoadingStateOpenChangeAction = (
  payload = globalLoadingOpenChangeInitialAction.payload
) => actionCreator(globalLoadingOpenChangeInitialAction.type, payload);

const onlineStatusChangeAction = (
  payload = onlineStatusInitialAction.payload
) => actionCreator(onlineStatusInitialAction.type, payload);

const globalActions = {
  appDrawerAction,
  dialogAction,
  globalLoadingStateOpenChangeAction,
  onlineStatusChangeAction,
  viewModeChangeAction,
};

export { globalActions };
