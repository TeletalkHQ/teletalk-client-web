import { newStateReplacer } from "functions/utilities/stateUtils";

import { initialAction } from "variables/initials/initialOptions/initialOptions";
import { initialStates } from "variables/initials/initialStates/initialStates";
import { otherInitialActions } from "variables/initials/initialActions/otherInitialActions";

const {
  getCountriesInitialAction,
  selectContactInitialAction,
  welcomeInitialAction,
} = otherInitialActions;

const otherReducer = (
  state = initialStates.otherState,
  action = initialAction
) => {
  try {
    const { payload, type } = action;

    const fn = () => newStateReplacer({ state, payload });

    switch (type) {
      case welcomeInitialAction.type:
        return fn();

      case getCountriesInitialAction.type:
        return fn();

      case selectContactInitialAction.type:
        return fn();

      default:
        return state;
    }
  } catch (error) {
    console.log("otherReducer catch", error);
  }
};

export { otherReducer };
