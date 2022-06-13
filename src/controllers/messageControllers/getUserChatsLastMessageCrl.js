import { userAction } from "~/actions/userActions/userActions";

import { getUserChatsLastMessageApi } from "~/apis/messageApis/getUserChatsLastMessageApi";

import { getInitialState } from "~/variables/constants/initials/initialStates/initialStates";

const handleAddUserLastMessage = ({ chats, chatsWithLastMessage }) => {
  try {
    const newChats = [...chats];

    for (const chat of newChats) {
      let targetChat = null; // {}

      chatsWithLastMessage.forEach((chatWithLastMessage) => {
        if (chatWithLastMessage.chatID === chat.chatID) {
          targetChat = chatWithLastMessage;
        }

        logger.log(chat);
        logger.log(chatWithLastMessage.chatID);
      });

      if (targetChat) {
        const index = newChats.findIndex(
          (chat) => chat.chatID === targetChat.chatID
        );
        logger.log(index);
        if (index !== -1) {
          logger.log(chat);
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
    logger.log("handleAddUserLastMessage catch", error);
  }
};

const getUserChatsLastMessageCrl = ({ user }) => {
  return async (dispatch, getState = getInitialState) => {
    try {
      const response = await getUserChatsLastMessageApi();

      const { chatsWithLastMessage } = handleAddUserLastMessage({
        chats: user.chats,
        chatsWithLastMessage: response.data.chats,
      });

      dispatch(userAction({ chats: chatsWithLastMessage }));
    } catch (error) {
      logger.log("getUserChatsLastMessageCrl", error);
    }
  };
};

export { getUserChatsLastMessageCrl };
