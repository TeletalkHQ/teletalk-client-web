import { arrayUtilities } from "utility-store/src/classes/ArrayUtilities";

const handleUpdateAllPrivateChats = (payload) => {
  return {
    privateChats: payload.privateChats,
  };
};

const handleCloseRightSide = () => {
  return {
    selectedUserForPrivateChat: {
      userId: "",
    },
  };
};

const addNewMessage = (messages, newMessage) => {
  return arrayUtilities.pushNewItems(messages, newMessage);
};
const handleAddNewToChatMessage = (payload, prevState) => {
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
    const messagesWithNewMessage = addNewMessage(
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

const handleSelectedUserForPrivateChat = (payload) => {
  return {
    selectedUserForPrivateChat: { userId: payload.userId },
  };
};

const messageReducerHandlers = {
  handleAddNewToChatMessage,
  handleCloseRightSide,
  handleSelectedUserForPrivateChat,
  handleUpdateAllPrivateChats,
};

export { messageReducerHandlers };
