import { actionCreator } from "functions/utilities/stateUtils";

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

const appDrawerOpenChangeAction = (
  payload = appDrawerOpenChangeInitialAction.payload
) => actionCreator(appDrawerOpenChangeInitialAction.type, payload);

const appProgressionChange = (
  payload = appProgressionChangeInitialAction.payload
) => actionCreator(appProgressionChangeInitialAction.type, payload);

const dialogOpenChangeAction = (
  payload = dialogOpenChangeInitialAction.payload
) => actionCreator(dialogOpenChangeInitialAction.type, payload);

const globalLoadingStateOpenChangeAction = (
  payload = globalLoadingOpenChangeInitialAction.payload
) => actionCreator(globalLoadingOpenChangeInitialAction.type, payload);

const onlineStatusChangeAction = (
  payload = onlineStatusInitialAction.payload
) => actionCreator(onlineStatusInitialAction.type, payload);

const viewModeChangeAction = (payload = viewModeInitialAction.payload) =>
  actionCreator(viewModeInitialAction.type, payload);

const resetGlobalState = () =>
  actionCreator(resetGlobalStateInitialAction.type);

const globalActions = {
  appDrawerOpenChangeAction,
  appProgressionChange,
  dialogOpenChangeAction,
  globalLoadingStateOpenChangeAction,
  onlineStatusChangeAction,
  viewModeChangeAction,
  resetGlobalState,
};

export { globalActions };
