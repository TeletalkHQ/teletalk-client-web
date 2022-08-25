import { initialStates } from "variables/initials/initialStates/initialStates";
import { initialContact } from "variables/initials/initialValues/initialValues";

const { userState } = initialStates;

const addNewContactInitialAction = {
  payload: {
    newContact: initialContact,
  },
  type: "ADD_NEW_CONTACT",
};

const addNewMessageToChatInitialAction = {
  payload: {
    newMessage: "",
    chatId: "",
  },
  type: "ADD_NEW_MESSAGE_TO_CHAT",
};

const updateAllUserDataInitialAction = {
  payload: userState,
  type: "UPDATE_ALL_USER_DATA",
};

const updateAllChatMessagesInitialAction = {
  payload: { messages: [], chatId: "" },
  type: "UPDATE_ALL_CHAT_MESSAGES",
};

const updateUserContactsInitialAction = {
  payload: {
    contacts: userState.contacts,
  },
  type: "UPDATE_USER_CONTACTS",
};

const resetUserStateInitialAction = {
  type: "RESET_USER_STATE",
};

const userInitialActions = {
  addNewContactInitialAction,
  addNewMessageToChatInitialAction,
  resetUserStateInitialAction,
  updateAllChatMessagesInitialAction,
  updateAllUserDataInitialAction,
  updateUserContactsInitialAction,
};

export { userInitialActions };
