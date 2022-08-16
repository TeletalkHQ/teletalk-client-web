import { appOptions } from "classes/AppOptions";

import { userInitialActions } from "variables/initials/initialActions/userInitialActions";
import { initialStates } from "variables/initials/initialStates/initialStates";

const {
  addNewContactInitialAction,
  addNewMessageToChatInitialAction,
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
        return payload;

      default:
        return state;
    }
  } catch (error) {
    console.log("userReducer catch", error);
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
  const copyMessages = [...messages];

  copyMessages.push(newMessage);

  return copyMessages;
};
