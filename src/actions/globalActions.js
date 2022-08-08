import { actionCreator } from "functions/utilities/stateUtils";

import { globalInitialActions } from "variables/initials/initialActions/globalInitialActions";

const {
  appDrawerOpenChangeInitialAction,
  dialogInitialAction,
  globalLoadingOpenChangeInitialAction,
  onlineStatusInitialAction,
  viewModeInitialAction,
} = globalInitialActions;

const viewModeChangeAction = (payload = viewModeInitialAction.payload) =>
  actionCreator(viewModeInitialAction.type, payload);

const appDrawerOpenChangeAction = (
  payload = appDrawerOpenChangeInitialAction.payload
) => actionCreator(appDrawerOpenChangeInitialAction.type, payload);

const dialogAction = (payload = dialogInitialAction.payload) =>
  actionCreator(dialogInitialAction.type, payload);

const globalLoadingStateOpenChangeAction = (
  payload = globalLoadingOpenChangeInitialAction.payload
) => actionCreator(globalLoadingOpenChangeInitialAction.type, payload);

const onlineStatusChangeAction = (
  payload = onlineStatusInitialAction.payload
) => actionCreator(onlineStatusInitialAction.type, payload);

const globalActions = {
  appDrawerOpenChangeAction,
  dialogAction,
  globalLoadingStateOpenChangeAction,
  onlineStatusChangeAction,
  viewModeChangeAction,
};

export { globalActions };
