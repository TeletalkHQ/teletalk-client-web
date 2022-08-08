import { appOptions } from "classes/AppOptions";

import { mergePrevStateWithPayload } from "functions/utilities/stateUtils";

import { initialStates } from "variables/initials/initialStates/initialStates";
import { globalInitialActions } from "variables/initials/initialActions/globalInitialActions";

const {
  appDrawerOpenChangeInitialAction,
  dialogInitialAction,
  globalLoadingOpenChangeInitialAction,
  loadingInitialAction,
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
      case viewModeInitialAction.type:
        return fn();

      case globalLoadingOpenChangeInitialAction.type:
        return handleGlobalLoadingStateOpenChange(state, payload);

      case appDrawerOpenChangeInitialAction.type:
        return handleAppDrawerStateOpenChange(state, payload);

      case dialogInitialAction.type:
        return fn();

      case onlineStatusInitialAction.type:
        return fn();

      case loadingInitialAction.type:
        return fn();

      default:
        return state;
    }
  } catch (error) {
    console.log("globalReducer catch", error);
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
