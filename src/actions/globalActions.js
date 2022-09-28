import { actionCreator } from "functions/utilities/stateUtilities";

import { globalInitialActions } from "variables/initials/initialActions/globalInitialActions";

const {
  appDrawerOpenChangeInitialAction,
  appProgressionChangeInitialAction,
  dialogOpenChangeInitialAction,
  globalLoadingOpenChangeInitialAction,
  onlineStatusInitialAction,
  viewModeInitialAction,
  resetGlobalStateInitialAction,
} = globalInitialActions;

const appDrawerOpenChange = (
  payload = appDrawerOpenChangeInitialAction.payload
) => actionCreator(appDrawerOpenChangeInitialAction.type, payload);

const appProgressionChange = (
  payload = appProgressionChangeInitialAction.payload
) => actionCreator(appProgressionChangeInitialAction.type, payload);

const dialogOpenChange = (payload = dialogOpenChangeInitialAction.payload) =>
  actionCreator(dialogOpenChangeInitialAction.type, payload);

const globalLoadingStateOpenChange = (
  payload = globalLoadingOpenChangeInitialAction.payload
) => actionCreator(globalLoadingOpenChangeInitialAction.type, payload);

const onlineStatusChange = (payload = onlineStatusInitialAction.payload) =>
  actionCreator(onlineStatusInitialAction.type, payload);

const viewModeChange = (payload = viewModeInitialAction.payload) =>
  actionCreator(viewModeInitialAction.type, payload);

const resetGlobalState = () =>
  actionCreator(resetGlobalStateInitialAction.type);

const globalActions = {
  appDrawerOpenChange,
  appProgressionChange,
  dialogOpenChange,
  globalLoadingStateOpenChange,
  onlineStatusChange,
  resetGlobalState,
  viewModeChange,
};

export { globalActions };
