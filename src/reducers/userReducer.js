import { newStateReplacer } from "functions/utilities/stateUtils";

import { userInitialActions } from "variables/initials/initialActions/initialActions";
import { initialAction } from "variables/initials/initialOptions/initialOptions";
import { initialStates } from "variables/initials/initialStates/initialStates";

const { userInitialAction } = userInitialActions;

const userReducer = (
  state = initialStates.userState,
  action = initialAction
) => {
  try {
    const { payload, type } = action;

    const fn = () => newStateReplacer({ state, payload });

    switch (type) {
      case userInitialAction.type:
        return fn();

      default:
        return state;
    }
  } catch (error) {
    console.log("userReducer catch", error);
  }
};

export { userReducer };
