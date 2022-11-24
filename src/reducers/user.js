import { appOptions } from "classes/AppOptions";

import { triers } from "functions/helpers/triers";

import { initialActions } from "variables/initials/actions";
import { initialStates } from "variables/initials/states";

const userReducer = (
  state = initialStates.user(),
  action = appOptions.getOptions().actionOptions
) => {
  return triers.reducerTrier({
    action,
    callerName: userReducer.name,
    reducerCases: userReducerCases,
    state,
  });
};

export { userReducer };

const handleAddNewContact = (prevState, payload) => {
  return {
    ...prevState,
    contacts: [...prevState.contacts, payload.newContact],
  };
};

const handleUpdateAllContacts = (prevState, payload) => {
  return {
    ...prevState,
    contacts: payload.contacts,
  };
};

const userReducerCases = {
  [initialActions.addNewContact.type]: (state, payload) =>
    handleAddNewContact(state, payload),

  [initialActions.updateAllUserContacts.type]: (state, payload) =>
    handleUpdateAllContacts(state, payload),

  [initialActions.updateAllUserData.type]: (_state, payload) => payload,

  [initialActions.resetUserState.type]: () => initialStates.user(),
};
