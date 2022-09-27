import { appOptions } from "classes/AppOptions";

import { printCatchError } from "functions/utilities/otherUtilities";

import { initialStates } from "variables/initials/initialStates/initialStates";
import { globalInitialActions } from "variables/initials/initialActions/globalInitialActions";
import { defaultGlobalState } from "variables/initials/initialStates/globalInitialState";

const {
  appDrawerOpenChangeInitialAction,
  appProgressionChangeInitialAction,
  dialogOpenChangeInitialAction,
  globalLoadingOpenChangeInitialAction,
  onlineStatusInitialAction,
  resetGlobalStateInitialAction,
  viewModeInitialAction,
} = globalInitialActions;

const globalReducer = (
  state = initialStates.globalState,
  action = appOptions.getOptions().actionOptions
) => {
  const { payload, type } = action;

  try {
    switch (type) {
      case appDrawerOpenChangeInitialAction.type:
        return handleAppDrawerStateOpenChange(state, payload);

      case appProgressionChangeInitialAction.type:
        return handleAppProgressionChange(state, payload);

      case dialogOpenChangeInitialAction.type:
        return handleDialogOpenChange(state, payload);

      case globalLoadingOpenChangeInitialAction.type:
        return handleGlobalLoadingStateOpenChange(state, payload);

      case onlineStatusInitialAction.type:
        return handleOnlineStatusStateChange(state, payload);

      case viewModeInitialAction.type:
        return handleUpdateViewMode(state, payload);

      case resetGlobalStateInitialAction.type:
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
    globalLoadingState: {
      ...prevState.globalLoadingState,
      open: payload.open,
    },
  };
};

const handleAppDrawerStateOpenChange = (prevState, payload) => {
  return {
    ...prevState,
    appDrawerState: {
      ...prevState.appDrawerState,
      anchor: {
        ...prevState.appDrawerState.anchor,
        [prevState.appDrawerState.currentAnchor]: payload.open,
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
