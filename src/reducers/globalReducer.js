import { appOptions } from "classes/AppOptions";

import { mergePrevStateWithPayload } from "functions/utilities/stateUtils";

import { initialStates } from "variables/initials/initialStates/initialStates";
import { globalInitialActions } from "variables/initials/initialActions/globalInitialActions";

const {
  appDrawerInitialAction,
  backdropInitialAction,
  dialogInitialAction,
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

      case backdropInitialAction.type:
        return fn();

      case appDrawerInitialAction.type:
        return fn();

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
