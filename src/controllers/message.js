import { eventManager } from "utility-store/src/classes/EventManager";

import { actions } from "store/actions";

import { apiManager } from "classes/api/ApiManager";
import { appOptions } from "classes/AppOptions";

import { utilities } from "utilities";

import { store } from "store/store";

const handleAddUserLastMessage = ({ chats, chatsWithLastMessage }) => {
  try {
    const newChats = [...chats];

    for (const chat of newChats) {
      let targetChat = null;

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
    utilities.printCatchError(handleAddUserLastMessage.name, error);
  }
};

const getChatsLastMessage = ({ chats }) => {
  return async (dispatch) => {
    try {
      const response =
        await apiManager.apis.getChatsLastMessage.sendFullFeaturedRequest();

      const { chatsWithLastMessage } = handleAddUserLastMessage({
        chats,
        chatsWithLastMessage: response.data.chats,
      });

      dispatch(actions.updateAllUserData({ chatInfo: chatsWithLastMessage }));
    } catch (error) {
      utilities.printCatchError(getChatsLastMessage.name, error);
    }
  };
};

const sendPrivateMessage = () => {
  return async (_dispatch, getState = store.initialState) => {
    try {
      const state = getState();

      const response =
        await apiManager.apis.sendPrivateMessage.sendFullFeaturedRequest({
          message: state.message.messageInputTextValue,
          participantId: state.message.selectedUserForPrivateChat.userId,
        });

      const { chatId, newMessage } = response.data;
      const eventName =
        appOptions.getOptions().EVENT_EMITTER_EVENTS.MESSAGE_SENT;
      eventManager.emitEvent(eventName, { chatId, newMessage });
    } catch (error) {
      utilities.printCatchError(sendPrivateMessage.name, error);
    }
  };
};

const getPrivateChats = () => {
  return async (dispatch, getState = store.initialState) => {
    try {
      const state = getState();

      for (const chatInfoItem of state.user.chatInfo) {
        const { chatId } = chatInfoItem;
        const response =
          await apiManager.apis.getPrivateChat.sendFullFeaturedRequest({
            chatId,
          });

        dispatch(actions.updatePrivateChatMessages(response.data.privateChat));
      }
    } catch (error) {
      utilities.printCatchError(getPrivateChats.name, error);
    }
  };
};

const messageControllers = {
  getPrivateChats,
  getChatsLastMessage,
  sendPrivateMessage,
};

export { messageControllers };
