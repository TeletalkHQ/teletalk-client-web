import { userActions } from "actions/userActions";

import { getAllChatMessagesApi } from "apis/messageApis";

const getAllChatMessagesController = ({ chatId }) => {
  return async (dispatch) => {
    try {
      const response = await getAllChatMessagesApi.sendRequest({ chatId });

      dispatch(
        userActions.updateAllChatMessagesAction({
          messages: response.data.messages,
          chatId,
        })
      );

      // dispatch(setMessagesAction({ messages: response.data.messages }));
    } catch (error) {
      console.log("getAllChatMessagesController", error);
    }
  };
};

export { getAllChatMessagesController };
