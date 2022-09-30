import { actionCreator } from "functions/utilities/stateUtilities";

import { initialActions } from "variables/initials/initialActions";

const addNewContact = (payload = initialActions.addNewContact.payload) =>
  actionCreator(initialActions.addNewContact.type, payload);

const addNewMessageToChat = (
  payload = initialActions.addNewMessageToChat.payload
) => actionCreator(initialActions.addNewMessageToChat.type, payload);

const updateAllChatMessages = (
  payload = initialActions.updateAllChatMessages.payload
) => actionCreator(initialActions.updateAllChatMessages.type, payload);

const updateAllUserData = (
  payload = initialActions.updateAllUserData.payload
) => actionCreator(initialActions.updateAllUserData.type, payload);

const updateAllUserContacts = (
  payload = initialActions.updateAllUserContacts.payload
) => actionCreator(initialActions.updateAllUserContacts.type, payload);

const resetUserState = () => actionCreator(initialActions.resetUserState.type);

const userActions = {
  addNewContact,
  addNewMessageToChat,
  resetUserState,
  updateAllChatMessages,
  updateAllUserContacts,
  updateAllUserData,
};

export { userActions };
