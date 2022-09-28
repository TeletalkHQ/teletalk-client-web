import { actions } from "actions/actions";

import { apiManager } from "classes/apiClasses/ApiManager";

import { printCatchError } from "functions/utilities/otherUtilities";

const getAllChatsController = () => {
  return async (dispatch) => {
    try {
      const response =
        await apiManager.apis.getAllChats.sendFullFeaturedRequest();

      dispatch(actions.updateAllUserData({ chats: response.data.chats }));
    } catch (error) {
      printCatchError(getAllChatsController.name, error);
    }
  };
};

export { getAllChatsController };
