import { newStateReplacer } from "functions/utilities/stateUtils";

import { initialStates } from "variables/initials/initialStates/initialStates";
import { initialAction } from "variables/initials/initialOptions/initialOptions";
import { globalInitialActions } from "variables/initials/initialActions/globalInitialActions";

const {
  appDrawerInitialAction,
  backdropInitialAction,
  viewModeInitialAction,
  dialogInitialAction,
  loadingInitialAction,
  onlineStatusInitialAction,
} = globalInitialActions;

const globalReducer = (
  state = initialStates.globalState,
  action = initialAction
) => {
  const { payload, type } = action;

  const fn = () => newStateReplacer({ state, payload });

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
