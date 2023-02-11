import { trier } from "utility-store/src/classes/Trier";

import { eventManager } from "src/classes/EventManager";

import { store } from "src/store/store";

const sendPrivateMessage = (socket) => {
  return async (_dispatch, getState = store.initialStates) => {
    await trier(sendPrivateMessage.name)
      .tryAsync(tryBlock, getState(), socket)
      .executeIfNoError(executeIfNoError)
      .runAsync();
  };
};

const tryBlock = async (state, socket = ioSocket) => {
  socket.emit("sendPrivateMessage", {
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
