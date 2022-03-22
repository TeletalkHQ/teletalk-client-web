import { newStateReplacer } from "~/Functions/Utils/stateUtils/stateUtils";

import { globalInitialActions } from "~/Variables/Constants/Initials/InitialActions/initialActions";
import { initialState } from "~/Variables/Constants/Initials/InitialStates/initialStates";
import { initialAction } from "~/Variables/Constants/Initials/InitialOptions/initialOptions";

const {
  appDrawerInitialAction,
  backdropInitialAction,
  viewModeInitialAction,
  dialogInitialAction,
  loadingInitialAction,
  onlineStatusInitialAction,
} = globalInitialActions;

const globalReducer = (
  state = initialState.globalInitialState,
  action = initialAction
) => {
  const { payload, type } = action;
  logger.log(action);

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
    logger.log("globalReducer catch", error);
  }
};

export { globalReducer };
