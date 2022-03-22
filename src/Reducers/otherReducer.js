import { newStateReplacer } from "~/Functions/Utils/stateUtils/stateUtils";

import { initialAction } from "~/Variables/Constants/Initials/InitialOptions/initialOptions";
import { initialState } from "~/Variables/Constants/Initials/InitialStates/initialStates";
import { otherInitialActions } from "~/Variables/Constants/Initials/InitialActions/otherInitialActions";

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
    logger.log("otherReducer catch", error);
  }
};

export { otherReducer };
