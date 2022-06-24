import { userAction } from "actions/userActions";

import { getAllChatsApi } from "apis/messageApis/getAllChatsApi";

const getChatsCrl = () => {
  return async (dispatch, getState) => {
    try {
      const response = await getAllChatsApi.sendRequest();

      dispatch(userAction({ chats: response.data.chats }));
    } catch (error) {
      console.log("getChatsCrl", error);
    }
  };
};

export { getChatsCrl };
