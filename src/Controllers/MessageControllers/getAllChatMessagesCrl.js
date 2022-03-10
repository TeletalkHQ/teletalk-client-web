import { userAction } from "~/Actions/UserActions/userActions";
import { getAllChatMessagesAPI } from "~/APIs/MessageApis/getAllChatMessagesAPI";
import { getInitialState } from "~/Variables/Constants/Initials/InitialStates/initialStates";

const getAllChatMessagesCrl = ({ chatID }) => {
  return async (dispatch, getState = getInitialState) => {
    try {
      const { user } = getState();

      const response = await getAllChatMessagesAPI({ chatID });

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
        dispatch(userAction({ chats: copyUser.chats }));
      }

      // dispatch(setMessagesAction({ messages: response.data.messages }));
    } catch (error) {
      console.log("getAllChatMessagesCrl", error);
    }
  };
};

export { getAllChatMessagesCrl };
