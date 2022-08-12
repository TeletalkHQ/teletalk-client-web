import { userActions } from "actions/userActions";

import { apiManager } from "classes/ApiManager";

const handleAddUserLastMessage = ({ chats, chatsWithLastMessage }) => {
  try {
    const newChats = [...chats];

    for (const chat of newChats) {
      let targetChat = null; // {}

      chatsWithLastMessage.forEach((chatWithLastMessage) => {
        if (chatWithLastMessage.chatId === chat.chatId) {
          targetChat = chatWithLastMessage;
        }
      });

      if (targetChat) {
        const index = newChats.findIndex(
          (chat) => chat.chatId === targetChat.chatId
        );
        console.log(index);
        if (index !== -1) {
          targetChat.messages = [
            ...(chat.messages || []),
            ...targetChat.messages,
          ];
          newChats.splice(index, 1, targetChat);
        }
      }
    }

    return { chatsWithLastMessage: newChats };
  } catch (error) {
    console.log("handleAddUserLastMessage catch", error);
  }
};

const getUserChatsLastMessageController = ({ user }) => {
  return async (dispatch) => {
    try {
      const response =
        await apiManager.apis.messageApis.getUserChatsLastMessageApi.sendRequest();

      const { chatsWithLastMessage } = handleAddUserLastMessage({
        chats: user.chats,
        chatsWithLastMessage: response.data.chats,
      });

      dispatch(
        userActions.updateAllUserDataAction({ chats: chatsWithLastMessage })
      );
    } catch (error) {
      console.log("getUserChatsLastMessageController", error);
    }
  };
};

export { getUserChatsLastMessageController };
