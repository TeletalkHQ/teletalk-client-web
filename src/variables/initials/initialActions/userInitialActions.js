import { initialStates } from "variables/initials/initialStates/initialStates";
import { initialContact } from "variables/initials/initialValues/initialValues";

const { user } = initialStates;

const addNewContact = {
  payload: {
    newContact: initialContact,
  },
  type: "ADD_NEW_CONTACT",
};

const addNewMessageToChat = {
  payload: {
    newMessage: "",
    chatId: "",
  },
  type: "ADD_NEW_MESSAGE_TO_CHAT",
};

const updateAllUserData = {
  payload: user,
  type: "UPDATE_ALL_USER_DATA",
};

const updateAllChatMessages = {
  payload: { messages: [], chatId: "" },
  type: "UPDATE_ALL_CHAT_MESSAGES",
};

const updateAllUserContacts = {
  payload: {
    contacts: user.contacts,
  },
  type: "UPDATE_USER_CONTACTS",
};

const resetUserState = {
  type: "RESET_USER_STATE",
};

const userInitialActions = {
  addNewContact,
  addNewMessageToChat,
  resetUserState,
  updateAllChatMessages,
  updateAllUserData,
  updateAllUserContacts,
};

export { userInitialActions };
