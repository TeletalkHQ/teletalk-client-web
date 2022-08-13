import { userActions } from "actions/userActions";

import { apiManager } from "classes/apiClasses/ApiManager";

const getAllChatMessagesController = ({ chatId }) => {
  return async (dispatch) => {
    try {
      const response =
        await apiManager.apis.messageApis.getAllChatMessagesApi.sendRequest({
          chatId,
        });

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
