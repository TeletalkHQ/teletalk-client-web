import { appOptions } from "classes/AppOptions";
import { arrayUtilities } from "utility-store/src/classes/ArrayUtilities";

import { printCatchError } from "functions/utilities/otherUtilities";

import { initialActions } from "variables/initials/initialActions";
import {
  defaultUserState,
  initialStates,
} from "variables/initials/initialStates";

const userReducer = (
  state = initialStates.user,
  action = appOptions.getOptions().actionOptions
) => {
  try {
    const { payload, type } = action;

    const reducerCase = userReducerCases[type];

    if (reducerCase) {
      return reducerCase(state, payload);
    }

    return state;
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

const userReducerCases = {
  [initialActions.addNewContact.type]: (state, payload) =>
    handleAddNewContact(state, payload),

  [initialActions.addNewMessageToChat.type]: (state, payload) =>
    handleAddNewToChatMessage(state, payload),

  [initialActions.updateAllUserContacts.type]: (state, payload) =>
    handleUpdateAllContacts(state, payload),

  [initialActions.updateAllChatMessages.type]: (state, payload) =>
    handleUpdateChatMessages(state, payload),

  [initialActions.updateAllUserData.type]: (_state, payload) => payload,

  [initialActions.resetUserState.type]: () => defaultUserState(),
};
