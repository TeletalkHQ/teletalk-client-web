import { actions } from "actions/actions";

import { apiManager } from "classes/apiClasses/ApiManager";

import { printCatchError } from "functions/utilities/otherUtilities";

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
    printCatchError(handleAddUserLastMessage.name, error);
  }
};

const getUserChatsLastMessageController = ({ chats }) => {
  return async (dispatch) => {
    try {
      const response =
        await apiManager.apis.getUserChatsLastMessage.sendFullFeaturedRequest();

      const { chatsWithLastMessage } = handleAddUserLastMessage({
        chats,
        chatsWithLastMessage: response.data.chats,
      });

      dispatch(actions.updateAllUserData({ chats: chatsWithLastMessage }));
    } catch (error) {
      printCatchError(getUserChatsLastMessageController.name, error);
    }
  };
};

export { getUserChatsLastMessageController };
