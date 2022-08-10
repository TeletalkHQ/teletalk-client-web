import { userActions } from "actions/userActions";

import { getAllChatsApi } from "apis/messageApis/getAllChatsApi";

const getAllChatsController = () => {
  return async (dispatch) => {
    try {
      const response = await getAllChatsApi.sendRequest();

      dispatch(
        userActions.updateAllUserDataAction({ chats: response.data.chats })
      );
    } catch (error) {
      console.log("getAllChatsController", error);
    }
  };
};

export { getAllChatsController };