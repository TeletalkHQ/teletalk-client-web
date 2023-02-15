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

const handleAddNewMessage = (payload, prevState) => {
  const { chatId, newMessage } = payload;

  const copyPrivateChats = [...prevState.privateChats];
  const index = copyPrivateChats.findIndex((item) => item.chatId === chatId);
  const chat = copyPrivateChats[index];
  const newChat = {
    ...chat,
    messages: [...chat.messages, newMessage],
  };

  copyPrivateChats.splice(index, 1, newChat);
  return {
    privateChats: copyPrivateChats,
  };
};

const handleSelectedUserForPrivateChat = (payload) => {
  return {
    selectedUserForPrivateChat: { userId: payload.userId },
  };
};

const handleCreateNewPrivateChat = (payload) => {
  console.log("handleCreateNewPrivateChat:", payload);
};

const messageReducerHandlers = {
  handleAddNewMessage,
  handleCloseRightSide,
  handleCreateNewPrivateChat,
  handleSelectedUserForPrivateChat,
  handleUpdateAllPrivateChats,
};

export { messageReducerHandlers };
