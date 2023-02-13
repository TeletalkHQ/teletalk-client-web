import { trier } from "utility-store/src/classes/Trier";

import { eventManager } from "src/classes/EventManager";
import { websocket } from "src/classes/Websocket";

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
  triggerMessageSentEvent();
};

const triggerMessageSentEvent = () => {
  const eventName = eventManager.EVENT_EMITTER_EVENTS.MESSAGE_SENT;
  eventManager.emitEvent(eventName);
};

export { sendPrivateMessage };
