const handleUpdateAllPrivateChats = (payload) => {
  return {
    privateChats: payload.privateChats,
  };
};

// const handleUpdateOnePrivateChat = (payload, prevState) => {
//   return {
//     privateChats: [...prevState.privateChats, payload],
//   };
// };

const handleCloseRightSide = () => {
  return {
    selectedChat: {
      id: "",
      type: "",
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

const handleSetSelectedChat = (payload) => {
  return {
    selectedChat: {
      type: payload.type,
      id: payload.id,
    },
  };
};

const handleCreateNewPrivateChat = (payload, prevState) => {
  return {
    privateChats: [...prevState.privateChats, payload.privateChat],
  };
};

const messageReducerHandlers = {
  handleAddNewMessage,
  handleCloseRightSide,
  handleCreateNewPrivateChat,
  handleSetSelectedChat,
  handleUpdateAllPrivateChats,
  // handleUpdateOnePrivateChat,
};

export { messageReducerHandlers };
