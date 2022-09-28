import { actionCreator } from "functions/utilities/stateUtilities";

import { initialActions } from "variables/initials/initialActions/initialActions";

const {
  userInitialActions: {
    addNewContactInitialAction,
    addNewMessageToChatInitialAction,
    updateAllChatMessagesInitialAction,
    updateAllUserDataInitialAction,
    updateUserContactsInitialAction,
    resetUserStateInitialAction,
  },
} = initialActions;

const addNewContact = (payload = addNewContactInitialAction.payload) =>
  actionCreator(addNewContactInitialAction.type, payload);

const addNewMessageToChat = (
  payload = addNewMessageToChatInitialAction.payload
) => actionCreator(addNewMessageToChatInitialAction.type, payload);

const updateAllChatMessages = (
  payload = updateAllChatMessagesInitialAction.payload
) => actionCreator(updateAllChatMessagesInitialAction.type, payload);

const updateAllUserData = (payload = updateAllUserDataInitialAction.payload) =>
  actionCreator(updateAllUserDataInitialAction.type, payload);

const updateAllUserContacts = (
  payload = updateUserContactsInitialAction.payload
) => actionCreator(updateUserContactsInitialAction.type, payload);

const resetUserState = () => actionCreator(resetUserStateInitialAction.type);

const userActions = {
  addNewContact,
  addNewMessageToChat,
  resetUserState,
  updateAllChatMessages,
  updateAllUserContacts,
  updateAllUserData,
};

export { userActions };
