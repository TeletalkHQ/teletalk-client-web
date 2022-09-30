import { appOptions } from "classes/AppOptions";

import { mergePrevStateWithPayload } from "functions/utilities/stateUtilities";
import { printCatchError } from "functions/utilities/otherUtilities";

import {
  defaultOtherState,
  initialStates,
} from "variables/initials/initialStates";
import { initialActions } from "variables/initials/initialActions";

const otherReducer = (
  state = initialStates.other,
  action = appOptions.getOptions().actionOptions
) => {
  try {
    const { payload, type } = action;

    const reducerCase = otherReducerCases[type];

    if (reducerCase) {
      return reducerCase(state, payload);
    }

    return state;
  } catch (error) {
    printCatchError(otherReducer.name, error);
  }
};

const fn = (state, payload) =>
  mergePrevStateWithPayload({
    payload,
    state,
  });

const otherReducerCases = {
  [initialActions.setWelcomeMessage.type]: (state, payload) =>
    fn(state, payload),

  [initialActions.getCountries.type]: (state, payload) => fn(state, payload),

  [initialActions.selectContact.type]: (state, payload) => fn(state, payload),

  [initialActions.resetOtherState.type]: () => defaultOtherState(),
};

export { otherReducer };
