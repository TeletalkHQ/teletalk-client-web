import { userActions } from "actions/userActions";

import { apiManager } from "classes/ApiManager";

const getAllChatsController = () => {
  return async (dispatch) => {
    try {
      const response =
        await apiManager.apis.messageApis.getAllChatsApi.sendRequest();

      dispatch(
        userActions.updateAllUserDataAction({ chats: response.data.chats })
      );
    } catch (error) {
      console.log("getAllChatsController", error);
    }
  };
};

export { getAllChatsController };
