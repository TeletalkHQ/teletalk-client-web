import { trier } from "simple-trier";

import { websocket } from "~/classes/websocket/Websocket";
import { store } from "~/store/store";

const sendPrivateMessage = () => {
  return async (_dispatch, getState = store.initialStates) => {
    await trier(sendPrivateMessage.name)
      .tryAsync(tryBlock, getState())
      .runAsync();
  };
};

const tryBlock = async (state) => {
  websocket.client.emit("sendPrivateMessage", {
    message: messageState.messageInputTextValue,
    participantId: messageState.selectedChat.id,
  });
};

export { sendPrivateMessage };
