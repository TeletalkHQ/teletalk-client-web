import { newStateReplacer } from "functions/utilities/stateUtils/stateUtils";

import { initialAction } from "variables/constants/initials/initialOptions/initialOptions";
import { initialState } from "variables/constants/initials/initialStates/initialStates";
import { otherInitialActions } from "variables/constants/initials/initialActions/otherInitialActions";

const {
  getCountriesInitialAction,
  selectContactInitialAction,
  welcomeInitialAction,
} = otherInitialActions;

const otherReducer = (
  state = initialState.otherInitialState,
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
