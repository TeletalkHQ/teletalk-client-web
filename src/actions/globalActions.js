import { actionCreator } from "functions/utilities/stateUtils";

import { globalInitialActions } from "variables/initials/initialActions/globalInitialActions";

const {
  appDrawerOpenChangeInitialAction,
  dialogOpenChangeInitialAction,
  globalLoadingOpenChangeInitialAction,
  onlineStatusInitialAction,
  viewModeInitialAction,
} = globalInitialActions;

const viewModeChangeAction = (payload = viewModeInitialAction.payload) =>
  actionCreator(viewModeInitialAction.type, payload);

const appDrawerOpenChangeAction = (
  payload = appDrawerOpenChangeInitialAction.payload
) => actionCreator(appDrawerOpenChangeInitialAction.type, payload);

const dialogOpenChangeAction = (
  payload = dialogOpenChangeInitialAction.payload
) => actionCreator(dialogOpenChangeInitialAction.type, payload);

const globalLoadingStateOpenChangeAction = (
  payload = globalLoadingOpenChangeInitialAction.payload
) => actionCreator(globalLoadingOpenChangeInitialAction.type, payload);

const onlineStatusChangeAction = (
  payload = onlineStatusInitialAction.payload
) => actionCreator(onlineStatusInitialAction.type, payload);

const globalActions = {
  appDrawerOpenChangeAction,
  dialogOpenChangeAction,
  globalLoadingStateOpenChangeAction,
  onlineStatusChangeAction,
  viewModeChangeAction,
};

export { globalActions };
