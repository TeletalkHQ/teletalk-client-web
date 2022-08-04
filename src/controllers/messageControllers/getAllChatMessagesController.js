import { userActions } from "actions/userActions";

import { getAllChatMessagesApi } from "apis/messageApis";

import { getInitialState } from "variables/initials/initialStates/initialStates";

const getAllChatMessagesController = ({ chatID }) => {
  return async (dispatch, getState = getInitialState) => {
    try {
      const { user } = getState();

      const response = await getAllChatMessagesApi.sendRequest({ chatID });

      const copyUser = { ...user };

      const chatIndex = copyUser.chats?.findIndex(
        (chat) => chat?.chatID === chatID
      );

      if (chatIndex !== -1) {
        const chat = copyUser.chats[chatIndex];

        copyUser.chats.splice(chatIndex, 1, {
          ...chat,
          messages: response.data.messages,
        });
        dispatch(userActions.userAction({ chats: copyUser.chats }));
      }

      // dispatch(setMessagesAction({ messages: response.data.messages }));
    } catch (error) {
      console.log("getAllChatMessagesController", error);
    }
  };
};

export { getAllChatMessagesController };
