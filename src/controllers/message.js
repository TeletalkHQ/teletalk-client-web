import { eventManager } from "utility-store/src/classes/EventManager";
import { trier } from "utility-store/src/classes/Trier";

import { actions } from "actions/actions";

import { apiManager } from "classes/api/ApiManager";
import { appOptions } from "classes/AppOptions";

import { printCatchError } from "functions/utilities/otherUtilities";

import { getInitialState } from "variables/initials/states";

const tryToGetAllChats = async () => {
  return await apiManager.apis.getAllChats.sendFullFeaturedRequest();
};

const executeIfNoErrorOnTryToGetAllChats = (response, dispatch) => {
  dispatch(actions.updateAllUserData({ chatInfo: response.data.chats }));
};

const getAllChats = () => {
  return async (dispatch) => {
    (await trier(getAllChats.name).tryAsync(tryToGetAllChats))
      .executeIfNoError(executeIfNoErrorOnTryToGetAllChats, dispatch)
      .catch(printCatchError, getAllChats.name);
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

      dispatch(actions.updateAllUserData({ chatInfo: chatsWithLastMessage }));
    } catch (error) {
      printCatchError(getUserChatsLastMessage.name, error);
    }
  };
};

const sendPrivateMessage = () => {
  return async (_dispatch, getState = getInitialState) => {
    try {
      const state = getState();

      const response =
        await apiManager.apis.sendPrivateMessage.sendFullFeaturedRequest({
          message: state.temp.messageInputTextValue,
          participantId: state.temp.selectedUserForPrivateChat.userId,
        });

      const { chatId, newMessage } = response.data;
      const eventName =
        appOptions.getOptions().EVENT_EMITTER_EVENTS.MESSAGE_SENT;
      eventManager.emitEvent(eventName, { chatId, newMessage });
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
