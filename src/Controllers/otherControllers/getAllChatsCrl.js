import { getAllChatsAPI } from "~/APIs/MessageApis/getAllChatsAPI";

import { userAction } from "~/Actions/UserActions/userActions";

const getChatsCrl = () => {
  return async (dispatch, getState) => {
    try {
      const response = await getAllChatsAPI();

      dispatch(userAction({ chats: response.data.chats }));
    } catch (error) {
      console.log("getChatsCrl", error);
    }
  };
};

export { getChatsCrl };
