import { appOptions } from "classes/AppOptions";

import { triers } from "functions/helpers/triers";

import {
  defaultGlobalState,
  initialStates,
} from "variables/initials/initialStates";
import { initialActions } from "variables/initials/initialActions";

const globalReducer = (
  state = initialStates.global,
  action = appOptions.getOptions().actionOptions
) => {
  return triers.reducerTrier({
    action,
    callerName: globalReducer.name,
    reducerCases: globalReducerCases,
    state,
  });
};

const handleGlobalLoadingStateOpenChange = (prevState, payload) => {
  return {
    ...prevState,
    loading: {
      ...prevState.loading,
      open: payload.open,
    },
  };
};

const handleAppDrawerStateOpenChange = (prevState, payload) => {
  return {
    ...prevState,
    appDrawer: {
      ...prevState.appDrawer,
      anchor: {
        ...prevState.appDrawer.anchor,
        [prevState.appDrawer.currentAnchor]: payload.open,
      },
    },
  };
};

const handleDialogOpenChange = (prevState, payload) => ({
  ...prevState,
  dialogState: {
    ...prevState.dialogState,
    [payload.dialogName]: {
      ...prevState.dialogState[payload.dialogName],
      open: payload.open,
      props: payload.props,
    },
  },
});

const handleOnlineStatusStateChange = (prevState, payload) => ({
  ...prevState,
  onlineStatus: {
    ...prevState.onlineStatus,
    ...payload,
  },
});

const handleAppProgressionChange = (prevState, payload) => ({
  ...prevState,
  appProgressions: {
    ...prevState.appProgressions,
    ...payload,
  },
});

const handleUpdateViewMode = (prevState, payload) => ({
  ...prevState,
  viewMode: payload.viewMode,
});

// const handleGetContacts = () => {
//   dispatch(getContactsController());
// };

const globalReducerCases = {
  [initialActions.appDrawerOpenChange.type]: (state, payload) =>
    handleAppDrawerStateOpenChange(state, payload),
  [initialActions.appProgressionChange.type]: (state, payload) =>
    handleAppProgressionChange(state, payload),
  [initialActions.dialogOpenChange.type]: (state, payload) =>
    handleDialogOpenChange(state, payload),
  [initialActions.globalLoadingOpenChange.type]: (state, payload) =>
    handleGlobalLoadingStateOpenChange(state, payload),
  [initialActions.onlineStatusChange.type]: (state, payload) =>
    handleOnlineStatusStateChange(state, payload),
  [initialActions.viewModeChange.type]: (state, payload) =>
    handleUpdateViewMode(state, payload),
  [initialActions.resetGlobalState.type]: () => defaultGlobalState(),
};

export { globalReducer };
