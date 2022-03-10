import { errorInitialActions } from "~/Variables/Constants/Initials/InitialActions/initialActions";
import { initialAction } from "~/Variables/Constants/Initials/InitialOptions/initialOptions";
import { initialState } from "~/Variables/Constants/Initials/InitialStates/initialStates";
import { newStateReplacer } from "~/Functions/Utils/stateUtils/stateUtils";
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
    console.log("notificationReducer", error);
  }
};

export { notificationReducer };
