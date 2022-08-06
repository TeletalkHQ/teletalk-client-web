import { initialStates } from "variables/initials/initialStates/initialStates";

const {
  globalState: {
    appDrawerState,
    backdropState,
    dialogState,
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

const appDrawerInitialAction = {
  payload: {
    appDrawerState,
  },
  type: "APP_DRAWER_STATE_CHANGE",
};
const backdropInitialAction = {
  payload: {
    backdropState,
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
  appDrawerInitialAction,
  backdropInitialAction,
  dialogInitialAction,
  loadingInitialAction,
  onlineStatusInitialAction,
  viewModeInitialAction,
};

export { globalInitialActions };
