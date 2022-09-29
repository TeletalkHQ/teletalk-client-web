import { defaultDialogStateItemProps } from "functions/utilities/stateUtilities";

import { initialStates } from "variables/initials/initialStates";

const {
  global: { appDrawer, appProgressions, loading },
  global,
} = initialStates;

const appDrawerOpenChange = {
  payload: {
    open: appDrawer.anchor.left,
  },
  type: "APP_DRAWER_STATE_CHANGE",
};

const appProgressionChange = {
  payload: appProgressions,
  type: "APP_PROGRESSION_CHANGE",
};

const dialogOpenChange = {
  payload: {
    ...defaultDialogStateItemProps(),
    dialogName: "",
  },
  type: "DIALOG_OPEN_STATE_CHANGE",
};

const globalLoadingOpenChange = {
  payload: {
    open: loading.open,
  },
  type: "GLOBAL_LOADING_STATE_CHANGE",
};

const onlineStatusChange = {
  payload: global.onlineStatus,
  type: "ONLINE_STATUS",
};

const viewModeChange = {
  payload: {
    viewMode: global.viewMode,
  },
  type: "VIEW_MODE_ONCHANGE",
};

const resetGlobalState = {
  type: "RESET_GLOBAL_STATE",
};

const globalInitialActions = {
  appDrawerOpenChange,
  appProgressionChange,
  dialogOpenChange,
  globalLoadingOpenChange,
  onlineStatusChange,
  resetGlobalState,
  viewModeChange,
};

export { globalInitialActions };
