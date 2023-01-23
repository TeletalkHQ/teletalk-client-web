import { trier } from "utility-store/src/classes/Trier";

import { apiManager } from "src/classes/api/ApiManager";
import { eventManager } from "src/classes/EventManager";

import { store } from "src/store/store";

const triggerMessageSentEvent = () => {
  const eventName = eventManager.EVENT_EMITTER_EVENTS.MESSAGE_SENT;
  eventManager.emitEvent(eventName);
};

const sendPrivateMessage = () => {
  return async (_dispatch, getState = store.initialStates) => {
    await trier(sendPrivateMessage.name)
      .tryAsync(tryToSendPrivateMessage, getState())
      .executeIfNoError(executeIfNoError)
      .runAsync();
  };
};

const tryToSendPrivateMessage = async (state) => {
  await apiManager.apis.sendPrivateMessage.sendFullFeaturedRequest({
    message: state.message.messageInputTextValue,
    participantId: state.message.selectedUserForPrivateChat.userId,
  });
};

const executeIfNoError = () => {
  triggerMessageSentEvent();
};

export { sendPrivateMessage };
