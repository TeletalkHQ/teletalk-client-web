import { arrayUtilities } from "utility-store/src/classes/ArrayUtilities";
import { initialActions } from "variables/initials/actions";

import { initialStates } from "variables/initials/states";

const handleUpdateChatMessages = (
  state = initialStates.message(),
  payload = initialActions.updatePrivateChatMessages.payload
) => {
  const { privateChatMessages } = state;

  const copyPrivateChatMessages =
    arrayUtilities.shallowCopy(privateChatMessages);

  const privateChatItemIndex = arrayUtilities.findIndexByPropValueEquality(
    copyPrivateChatMessages,
    payload.chatId,
    "chatId"
  );

  if (privateChatItemIndex !== -1) {
    copyPrivateChatMessages.splice(privateChatItemIndex, 1, payload);
  } else {
    copyPrivateChatMessages.push(payload);
  }

  return {
    privateChatMessages: copyPrivateChatMessages,
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

const handleAddNewMessage = (messages, newMessage) => {
  return arrayUtilities.pushNewItems(messages, newMessage);
};

const messageReducerHandlers = {
  handleAddNewToChatMessage,
  handleUpdateChatMessages,
};

export { messageReducerHandlers };
