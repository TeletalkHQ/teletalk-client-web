import { appOptions } from "classes/AppOptions";

import { printCatchError } from "functions/utilities/otherUtilities";

import {
  defaultGlobalState,
  initialStates,
} from "variables/initials/initialStates";
import { initialActions } from "variables/initials/initialActions";

const globalReducer = (
  state = initialStates.global,
  action = appOptions.getOptions().actionOptions
) => {
  const { payload, type } = action;

  try {
    switch (type) {
      case initialActions.appDrawerOpenChange.type:
        return handleAppDrawerStateOpenChange(state, payload);

      case initialActions.appProgressionChange.type:
        return handleAppProgressionChange(state, payload);

      case initialActions.dialogOpenChange.type:
        return handleDialogOpenChange(state, payload);

      case initialActions.globalLoadingOpenChange.type:
        return handleGlobalLoadingStateOpenChange(state, payload);

      case initialActions.onlineStatusChange.type:
        return handleOnlineStatusStateChange(state, payload);

      case initialActions.viewModeChange.type:
        return handleUpdateViewMode(state, payload);

      case initialActions.resetGlobalState.type:
        return defaultGlobalState();

      default:
        return state;
    }
  } catch (error) {
    printCatchError(globalReducer.name, error);
  }
};

export { globalReducer };

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
