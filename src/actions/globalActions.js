import { actionCreator } from "functions/utilities/stateUtilities";

import { initialActions } from "variables/initials/initialActions/initialActions";

const appDrawerOpenChange = (
  payload = initialActions.appDrawerOpenChange.payload
) => actionCreator(initialActions.appDrawerOpenChange.type, payload);

const appProgressionChange = (
  payload = initialActions.appProgressionChange.payload
) => actionCreator(initialActions.appProgressionChange.type, payload);

const dialogOpenChange = (payload = initialActions.dialogOpenChange.payload) =>
  actionCreator(initialActions.dialogOpenChange.type, payload);

const globalLoadingOpenChange = (
  payload = initialActions.globalLoadingOpenChange.payload
) => actionCreator(initialActions.globalLoadingOpenChange.type, payload);

const onlineStatusChange = (
  payload = initialActions.onlineStatusChange.payload
) => actionCreator(initialActions.onlineStatusChange.type, payload);

const viewModeChange = (payload = initialActions.viewModeChange.payload) =>
  actionCreator(initialActions.viewModeChange.type, payload);

const resetGlobalState = () =>
  actionCreator(initialActions.resetGlobalState.type);

const globalActions = {
  appDrawerOpenChange,
  appProgressionChange,
  dialogOpenChange,
  globalLoadingOpenChange,
  onlineStatusChange,
  resetGlobalState,
  viewModeChange,
};

export { globalActions };
