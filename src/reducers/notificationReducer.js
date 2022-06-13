import { errorInitialActions } from "~/variables/constants/initials/initialActions/initialActions";
import { initialAction } from "~/variables/constants/initials/initialOptions/initialOptions";
import { initialState } from "~/variables/constants/initials/initialStates/initialStates";
import { newStateReplacer } from "~/functions/utils/stateUtils/stateUtils";
const { econnabortedAction } = errorInitialActions;

const notificationReducer = (
  state = initialState.errorInitialState,
  action = initialAction
) => {
  try {
    const { payload, type } = action;

    const fn = () => newStateReplacer({ state, payload });

    switch (type) {
      case econnabortedAction.type:
        return fn();

      default:
        return state;
    }
  } catch (error) {
    logger.log("notificationReducer", error);
  }
};

export { notificationReducer };
