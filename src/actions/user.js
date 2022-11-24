import { actionCreator } from "functions/utilities/stateUtilities";

import { initialActions } from "variables/initials/actions";

const addNewContact = (payload = initialActions.addNewContact.payload) =>
  actionCreator(initialActions.addNewContact.type, payload);

const updateAllUserData = (
  payload = initialActions.updateAllUserData.payload
) => actionCreator(initialActions.updateAllUserData.type, payload);

const updateAllUserContacts = (
  payload = initialActions.updateAllUserContacts.payload
) => actionCreator(initialActions.updateAllUserContacts.type, payload);

const resetUserState = () => actionCreator(initialActions.resetUserState.type);

const userActions = {
  addNewContact,
  resetUserState,
  updateAllUserContacts,
  updateAllUserData,
};

export { userActions };
