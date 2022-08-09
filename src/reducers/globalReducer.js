import { appOptions } from "classes/AppOptions";

import { mergePrevStateWithPayload } from "functions/utilities/stateUtils";

import { initialStates } from "variables/initials/initialStates/initialStates";
import { globalInitialActions } from "variables/initials/initialActions/globalInitialActions";

const {
  appDrawerOpenChangeInitialAction,
  appProgressionChangeInitialAction,
  dialogOpenChangeInitialAction,
  globalLoadingOpenChangeInitialAction,
  onlineStatusInitialAction,
  viewModeInitialAction,
} = globalInitialActions;

const globalReducer = (
  state = initialStates.globalState,
  action = appOptions.options.actionOptions
) => {
  const { payload, type } = action;

  const fn = () => mergePrevStateWithPayload({ state, payload });

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
        return fn();
      default:
        return state;
    }
  } catch (error) {
    console.log("globalReducer catch, error:", error);
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
    [payload.dialogName]: { open: payload.open },
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
