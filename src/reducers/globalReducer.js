import { newStateReplacer } from "~/functions/utils/stateUtils/stateUtils";

import { globalInitialActions } from "~/variables/constants/initials/initialActions/initialActions";
import { initialState } from "~/variables/constants/initials/initialStates/initialStates";
import { initialAction } from "~/variables/constants/initials/initialOptions/initialOptions";

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
