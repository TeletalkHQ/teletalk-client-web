import { userActions } from "actions/userActions";

import { getUserChatsLastMessageApi } from "apis/messageApis";

import { getInitialState } from "variables/initials/initialStates/initialStates";

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

const getUserChatsLastMessageController = ({ user }) => {
  return async (dispatch, getState = getInitialState) => {
    try {
      const response = await getUserChatsLastMessageApi.sendRequest();

      const { chatsWithLastMessage } = handleAddUserLastMessage({
        chats: user.chats,
        chatsWithLastMessage: response.data.chats,
      });

      dispatch(userActions.userAction({ chats: chatsWithLastMessage }));
    } catch (error) {
      console.log("getUserChatsLastMessageController", error);
    }
  };
};

export { getUserChatsLastMessageController };