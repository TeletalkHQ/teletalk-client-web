import { initialStates } from "variables/initials/initialStates/initialStates";

const {
  globalState: {
    appDrawerState,
    globalLoadingState,
    onlineStatus,
    viewMode,
    appProgressions,
  },
} = initialStates;

const appDrawerOpenChangeInitialAction = {
  payload: {
    open: appDrawerState.anchor.left,
  },
  type: "APP_DRAWER_STATE_CHANGE",
};

const appProgressionChangeInitialAction = {
  payload: appProgressions,
  type: "APP_PROGRESSION_CHANGE",
};

const dialogOpenChangeInitialAction = {
  payload: {
    dialogName: "",
    open: false,
  },
  type: "DIALOG_STATE_CHANGE",
};

const globalLoadingOpenChangeInitialAction = {
  payload: {
    open: globalLoadingState.open,
  },
  type: "BACKDROP_STATE_CHANGE",
};

const onlineStatusInitialAction = {
  payload: onlineStatus,
  type: "ONLINE_STATUS",
};

const viewModeInitialAction = {
  payload: {
    viewMode,
  },
  type: "VIEW_MODE_ONCHANGE",
};

const globalInitialActions = {
  appDrawerOpenChangeInitialAction,
  appProgressionChangeInitialAction,
  dialogOpenChangeInitialAction,
  globalLoadingOpenChangeInitialAction,
  onlineStatusInitialAction,
  viewModeInitialAction,
};

export { globalInitialActions };
