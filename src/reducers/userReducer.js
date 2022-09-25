import { appOptions } from "classes/AppOptions";
import { arrayUtilities } from "utility-store/src/classes/ArrayUtilities";

import { printCatchError } from "functions/utilities/otherUtilities";

import { userInitialActions } from "variables/initials/initialActions/userInitialActions";
import { initialStates } from "variables/initials/initialStates/initialStates";
import { defaultUserState } from "variables/initials/initialStates/userInitialState";

const {
  addNewContactInitialAction,
  addNewMessageToChatInitialAction,
  resetUserStateInitialAction,
  updateAllChatMessagesInitialAction,
  updateAllUserDataInitialAction,
  updateUserContactsInitialAction,
} = userInitialActions;

const userReducer = (
  state = initialStates.userState,
  action = appOptions.getOptions().actionOptions
) => {
  try {
    const { payload, type } = action;

    switch (type) {
      case addNewContactInitialAction.type:
        return handleAddNewContact(state, payload);

      case addNewMessageToChatInitialAction.type:
        return handleAddNewToChatMessage(state, payload);

      case updateUserContactsInitialAction.type:
        return handleUpdateAllContacts(state, payload);

      case updateAllChatMessagesInitialAction.type:
        return handleUpdateChatMessages(state, payload);

      case updateAllUserDataInitialAction.type:
        return initialStates;

      case resetUserStateInitialAction.type:
        return defaultUserState();

      default:
        return state;
    }
  } catch (error) {
    printCatchError(userReducer.name, error);
  }
};

export { userReducer };

const handleAddNewContact = (prevState, payload) => {
  return {
    ...prevState,
    contacts: [...prevState.contacts, payload.newContact],
  };
};

const handleAddNewToChatMessage = (prevState, payload) => {
  const copyUser = { ...prevState };
  const { chatId, newMessage } = payload;

  const chatIndex = copyUser.chats?.findIndex(
    (chat) => chat?.chatId === chatId
  );

  if (chatIndex !== -1) {
    const chat = copyUser.chats[chatIndex] || {
      chatId,
      messages: [newMessage],
    };
    const messagesWithNewMessage = handleAddNewMessage(
      chat.messages || [],
      newMessage
    );

    const newChat = { ...chat, messages: messagesWithNewMessage };

    copyUser.chats.splice(chatIndex, 1, newChat);
  }

  return {
    ...prevState,
    chats: copyUser.chats,
  };
};

const handleUpdateAllContacts = (prevState, payload) => {
  return {
    ...prevState,
    contacts: payload.contacts,
  };
};

const handleUpdateChatMessages = (prevState, payload) => {
  const copyUser = { ...prevState };
  const { chatId, messages } = payload;

  const chatIndex = copyUser.chats?.findIndex(
    (chat) => chat?.chatId === chatId
  );

  if (chatIndex !== -1) {
    const chat = copyUser.chats[chatIndex];

    copyUser.chats.splice(chatIndex, 1, {
      ...chat,
      messages,
    });
  }
};

const handleAddNewMessage = (messages, newMessage) => {
  return arrayUtilities.pushNewItems(messages, newMessage);
};
