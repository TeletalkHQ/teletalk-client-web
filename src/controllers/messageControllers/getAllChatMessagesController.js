import { actions } from "actions/actions";

import { apiManager } from "classes/apiClasses/ApiManager";

import { printCatchError } from "functions/utilities/otherUtilities";

const getAllChatMessagesController = ({ chatId }) => {
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
      printCatchError(getAllChatMessagesController.name, error);
    }
  };
};

export { getAllChatMessagesController };
