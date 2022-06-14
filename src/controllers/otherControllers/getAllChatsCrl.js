import { getAllChatsApi } from "apis/messageApis/getAllChatsApi";

import { userAction } from "actions/userActions/userActions";

const getChatsCrl = () => {
  return async (dispatch, getState) => {
    try {
      const response = await getAllChatsApi();

      dispatch(userAction({ chats: response.data.chats }));
    } catch (error) {
      console.log("getChatsCrl", error);
    }
  };
};

export { getChatsCrl };
