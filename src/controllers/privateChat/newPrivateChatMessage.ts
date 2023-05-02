import { websocket } from "src/classes/websocket/Websocket";
import { actions } from "src/store/actions";

const newPrivateChatMessage = ({ chatId, newMessage }) => {
  return (dispatch, getState) => {
    const state = getState();

    if (isChatExist(state, chatId))
      return dispatch(actions.addNewMessage({ chatId, newMessage }));

    websocket.client.emit("getChatInfo", { chatId }, (response) => {
      dispatch(
        actions.createNewPrivateChat({
          privateChat: {
            ...response.data.chatInfo,
            messages: [newMessage],
          },
        })
      );
    });
  };
};

const isChatExist = (state, chatId) =>
  state.message.privateChats.some((item) => item.chatId === chatId);

export { newPrivateChatMessage };