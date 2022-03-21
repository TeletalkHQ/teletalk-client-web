import { userAction } from "~/Actions/UserActions/userActions";

import { getUserChatsLastMessageApi } from "~/Apis/MessageApis/getUserChatsLastMessageApi";

import { getInitialState } from "~/Variables/Constants/Initials/InitialStates/initialStates";

const handleAddUserLastMessage = ({ chats, chatsWithLastMessage }) => {
  try {
    const newChats = [...chats];

    for (const chat of newChats) {
      let targetChat = null; // {}

      chatsWithLastMessage.forEach((chatWithLastMessage) => {
        if (chatWithLastMessage.chatID === chat.chatID) {
          targetChat = chatWithLastMessage;
        }

        console.log(chat);
        console.log(chatWithLastMessage.chatID);
      });

      if (targetChat) {
        const index = newChats.findIndex(
          (chat) => chat.chatID === targetChat.chatID
        );
        console.log(index);
        if (index !== -1) {
          console.log(chat);
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
      console.log("getUserChatsLastMessageCrl", error);
    }
  };
};

export { getUserChatsLastMessageCrl };
