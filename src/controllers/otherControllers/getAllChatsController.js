import { userAction } from "actions/userActions";

import { getAllChatsApi } from "apis/messageApis/getAllChatsApi";

const getAllChatsController = () => {
  return async (dispatch, getState) => {
    try {
      const response = await getAllChatsApi.sendRequest();

      dispatch(userAction({ chats: response.data.chats }));
    } catch (error) {
      console.log("getAllChatsController", error);
    }
  };
};

export { getAllChatsController };
