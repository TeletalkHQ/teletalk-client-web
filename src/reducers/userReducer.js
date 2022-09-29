import { appOptions } from "classes/AppOptions";
import { arrayUtilities } from "utility-store/src/classes/ArrayUtilities";

import { printCatchError } from "functions/utilities/otherUtilities";

import { defaultUserState } from "variables/initials/initialStates/userInitialState";
import { initialActions } from "variables/initials/initialActions/initialActions";
import { initialStates } from "variables/initials/initialStates/initialStates";

const userReducer = (
  state = initialStates.user,
  action = appOptions.getOptions().actionOptions
) => {
  console.log(action);
  try {
    const { payload, type } = action;

    switch (type) {
      case initialActions.addNewContact.type:
        return handleAddNewContact(state, payload);

      case initialActions.addNewMessageToChat.type:
        return handleAddNewToChatMessage(state, payload);

      case initialActions.updateAllUserContacts.type:
        return handleUpdateAllContacts(state, payload);

      case initialActions.updateAllChatMessages.type:
        return handleUpdateChatMessages(state, payload);

      case initialActions.updateAllUserData.type:
        return payload;

      case initialActions.resetUserState.type:
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
