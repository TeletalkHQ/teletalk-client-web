import { websocket } from "src/classes/Websocket";
import { actions } from "src/store/actions";

const newPrivateChatMessage = ({ chatId, newMessage }) => {
  return (dispatch, getState) => {
    const state = getState();

    console.log(state.message.privateChats, isChatExist(state, chatId));

    if (isChatExist(state, chatId))
      return dispatch(actions.addNewMessage({ chatId, newMessage }));

    // websocket.client.emit("getChatInfo", { chatId }, (chatInfo) => {
    //   dispatch(
    //     actions.createNewPrivateChat({
    //       ...chatInfo,
    //       messages: [newMessage],
    //     })
    //   );
    // });
  };
};

const isChatExist = (state, chatId) =>
  state.message.privateChats.some((item) => item.chatId === chatId);

export { newPrivateChatMessage };
