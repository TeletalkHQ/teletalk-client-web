import { actions } from "actions/actions";

import { commonFunctionalities } from "classes/CommonFunctionalities";
import { apiManager } from "classes/apiClasses/ApiManager";

import { printCatchError } from "functions/utilities/otherUtilities";

import { getInitialState } from "variables/initials/initialStates/initialStates";

const getAllChats = () => {
  return async (dispatch) => {
    try {
      const response =
        await apiManager.apis.getAllChats.sendFullFeaturedRequest();

      dispatch(actions.updateAllUserData({ chats: response.data.chats }));
    } catch (error) {
      printCatchError(getAllChats.name, error);
    }
  };
};

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

const getUserChatsLastMessage = ({ chats }) => {
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
      printCatchError(getUserChatsLastMessage.name, error);
    }
  };
};

const sendPrivateMessage = () => {
  return async (dispatch, getState = getInitialState) => {
    try {
      const {
        temp: {
          messageInputText,
          selectedContact: { privateId },
        },
      } = getState();

      const response =
        await apiManager.apis.sendPrivateMessage.sendFullFeaturedRequest({
          message: messageInputText,
          participantId: privateId,
        });

      const { chatId, newMessage } = response.data;
      dispatch(actions.addNewMessageToChat({ chatId, newMessage }));

      commonFunctionalities.resetMessageInputText();
    } catch (error) {
      printCatchError(sendPrivateMessage.name, error);
    }
  };
};

const getAllChatMessages = ({ chatId }) => {
  return async (dispatch) => {
    try {
      const response =
        await apiManager.apis.getAllChatMessages.sendFullFeaturedRequest({
          chatId,
        });

      dispatch(
        actions.updateAllChatMessages({
          messages: response.data.messages,
          chatId,
        })
      );

      // dispatch(setMessagesAction({ messages: response.data.messages }));
    } catch (error) {
      printCatchError(getAllChatMessages.name, error);
    }
  };
};

const messageControllers = {
  getAllChatMessages,
  getAllChats,
  getUserChatsLastMessage,
  sendPrivateMessage,
};

export { messageControllers };
