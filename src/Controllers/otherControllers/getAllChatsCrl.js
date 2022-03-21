import { getAllChatsApi } from "~/Apis/MessageApis/getAllChatsApi";

import { userAction } from "~/Actions/UserActions/userActions";

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
