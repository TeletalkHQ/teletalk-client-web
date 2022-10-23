import { appOptions } from "classes/AppOptions";

import { mergePrevStateWithPayload } from "functions/utilities/stateUtilities";
import { triers } from "functions/helpers/triers";

import { initialActions } from "variables/initials/initialActions";
import { initialStates } from "variables/initials/initialStates";

const notificationReducer = (
  state = initialStates.notification(),
  action = appOptions.getOptions().actionOptions
) => {
  return triers.reducerTrier({
    action,
    callerName: notificationReducer.name,
    reducerCases: notificationReducerCases,
    state,
  });
};
const fn = (state, payload) => mergePrevStateWithPayload({ state, payload });

const notificationReducerCases = {
  [initialActions.errorNotification.type]: (state, payload) =>
    fn(state, payload),
};

export { notificationReducer };
