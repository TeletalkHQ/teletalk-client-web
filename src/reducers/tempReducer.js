import { appOptions } from "classes/AppOptions";

import { mergePrevStateWithPayload } from "functions/utilities/stateUtilities";
import { printCatchError } from "functions/utilities/otherUtilities";

import { initialActions } from "variables/initials/initialActions";
import {
  defaultTempState,
  initialStates,
} from "variables/initials/initialStates";

const tempReducer = (
  state = initialStates.temp,
  action = appOptions.getOptions().actionOptions
) => {
  try {
    const { payload, type } = action;

    const reducerCase = tempReducerCases[type];

    if (reducerCase) {
      return reducerCase(state, payload);
    }

    return state;
  } catch (error) {
    printCatchError(tempReducer.name, error);
  }
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

  [initialActions.resetTempState.type]: () => defaultTempState(),

  [initialActions.selectedContactId.type]: (state, payload) =>
    fn(state, payload),

  [initialActions.selectedCountry.type]: (state, payload) => fn(state, payload),

  [initialActions.setMessages.type]: (state, payload) => fn(state, payload),

  [initialActions.verificationCodeOnChange.type]: (state, payload) =>
    fn(state, payload),
};

export { tempReducer };
