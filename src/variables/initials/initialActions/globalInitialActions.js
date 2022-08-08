import { initialStates } from "variables/initials/initialStates/initialStates";

const {
  globalState: {
    appDrawerState,
    dialogState,
    globalLoadingState,
    loadingState,
    onlineStatus,
    viewMode,
  },
} = initialStates;

const loadingInitialAction = {
  payload: {
    loadingState,
  },
  type: "LOADING_STATE",
};

const onlineStatusInitialAction = {
  payload: {
    onlineStatus,
  },
  type: "ONLINE_STATUS",
};

const appDrawerOpenChangeInitialAction = {
  payload: {
    open: appDrawerState.anchor.left,
  },
  type: "APP_DRAWER_STATE_CHANGE",
};

const globalLoadingOpenChangeInitialAction = {
  payload: {
    open: globalLoadingState.open,
  },
  type: "BACKDROP_STATE_CHANGE",
};

const viewModeInitialAction = {
  payload: {
    viewMode,
  },
  type: "VIEW_MODE_ONCHANGE",
};

const dialogInitialAction = {
  payload: {
    dialogState,
  },
  type: "DIALOG_STATE_CHANGE",
};

const globalInitialActions = {
  appDrawerOpenChangeInitialAction,
  dialogInitialAction,
  globalLoadingOpenChangeInitialAction,
  loadingInitialAction,
  onlineStatusInitialAction,
  viewModeInitialAction,
};

export { globalInitialActions };
