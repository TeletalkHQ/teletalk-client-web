import { appOptions } from "classes/AppOptions";

import { mergePrevStateWithPayload } from "functions/utilities/stateUtilities";
import { triers } from "functions/helpers/triers";

import { initialActions } from "variables/initials/initialActions";
import { initialStates } from "variables/initials/initialStates";

const tempReducer = (
  state = initialStates.temp(),
  action = appOptions.getOptions().actionOptions
) => {
  return triers.reducerTrier({
    action,
    callerName: tempReducer.name,
    reducerCases: tempReducerCases,
    state,
  });
};

const fn = (state, payload) => mergePrevStateWithPayload({ state, payload });

const tempReducerCases = {
  [initialActions.countryCodeOnChange.type]: (state, payload) =>
    fn(state, payload),

  [initialActions.countryNameOnChange.type]: (state, payload) =>
    fn(state, payload),

  [initialActions.firstNameOnChange.type]: (state, payload) =>
    fn(state, payload),

  [initialActions.lastNameOnChange.type]: (state, payload) =>
    fn(state, payload),

  [initialActions.messageInputOnChange.type]: (state, payload) =>
    fn(state, payload),

  [initialActions.phoneNumberOnChange.type]: (state, payload) =>
    fn(state, payload),

  [initialActions.resetTempState.type]: () => initialStates.temp(),

  [initialActions.selectedContactId.type]: (state, payload) =>
    fn(state, payload),

  [initialActions.selectedCountry.type]: (state, payload) => fn(state, payload),

  [initialActions.setMessages.type]: (state, payload) => fn(state, payload),

  [initialActions.verificationCodeOnChange.type]: (state, payload) =>
    fn(state, payload),
};

export { tempReducer };
