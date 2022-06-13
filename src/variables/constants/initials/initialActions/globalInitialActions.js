import { initialState } from "~/variables/constants/initials/initialStates/initialStates";

const {
  globalInitialState: {
    appDrawerState,
    backdropState,
    dialogState,
    viewMode,
    onlineStatus,
    loadingState,
  },
} = initialState;

const loadingInitialAction = {
  type: "LOADING_STATE",
  payload: {
    loadingState,
  },
};

const onlineStatusInitialAction = {
  type: "ONLINE_STATUS",
  payload: { onlineStatus },
};

const appDrawerInitialAction = {
  type: "APP_DRAWER_STATE_CHANGE",
  payload: { appDrawerState },
};
const backdropInitialAction = {
  type: "BACKDROP_STATE_CHANGE",
  payload: { backdropState },
};
const viewModeInitialAction = {
  type: "VIEW_MODE_ONCHANGE",
  payload: { viewMode },
};
const dialogInitialAction = {
  type: "DIALOG_STATE_CHANGE",
  payload: { dialogState },
};

const globalInitialActions = {
  onlineStatusInitialAction,
  appDrawerInitialAction,
  backdropInitialAction,
  viewModeInitialAction,
  dialogInitialAction,
  loadingInitialAction,
};

export {
  globalInitialActions,
  onlineStatusInitialAction,
  appDrawerInitialAction,
  backdropInitialAction,
  viewModeInitialAction,
  dialogInitialAction,
  loadingInitialAction,
};
