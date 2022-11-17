import { appOptions } from "classes/AppOptions";

import { mergePrevStateWithPayload } from "functions/utilities/stateUtilities";
import { triers } from "functions/helpers/triers";

import { initialStates } from "variables/initials/states";
import { initialActions } from "variables/initials/actions";

const otherReducer = (
  state = initialStates.other(),
  action = appOptions.getOptions().actionOptions
) => {
  return triers.reducerTrier({
    action,
    callerName: otherReducer.name,
    reducerCases: otherReducerCases,
    state,
  });
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

  [initialActions.resetOtherState.type]: () => initialStates.other(),
};

export { otherReducer };