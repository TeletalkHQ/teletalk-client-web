import { trier } from "utility-store/src/classes/Trier";

import { eventEmitter } from "src/classes/EventEmitter";
import { websocket } from "src/classes/websocket/Websocket";

import { store } from "src/store/store";

const sendPrivateMessage = () => {
  return async (_dispatch, getState = store.initialStates) => {
    await trier(sendPrivateMessage.name)
      .tryAsync(tryBlock, getState())
      .executeIfNoError(executeIfNoError)
      .runAsync();
  };
};

const tryBlock = async (state) => {
  websocket.client.emit("sendPrivateMessage", {
    message: state.message.messageInputTextValue,
    participantId: state.message.selectedUserForPrivateChat.userId,
  });
};

const executeIfNoError = () => {
  const eventName = eventEmitter.EVENT_EMITTER_EVENTS.MESSAGE_SENT;
  eventEmitter.emitEvent(eventName);
};

export { sendPrivateMessage };
