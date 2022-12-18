import { trier } from "utility-store/src/classes/Trier";

import { apiManager } from "src/classes/api/ApiManager";

import { store } from "src/store/store";
import { actions } from "src/store/actions";
import { eventManager } from "src/classes/EventManager";

const triggerMessageSentEvent = () => {
  const eventName = eventManager.EVENT_EMITTER_EVENTS.MESSAGE_SENT;
  eventManager.emitEvent(eventName);
};

const sendPrivateMessage = () => {
  const tryToSendPrivateMessage = async (state) => {
    await apiManager.apis.sendPrivateMessage.sendFullFeaturedRequest({
      message: state.message.messageInputTextValue,
      participantId: state.message.selectedUserForPrivateChat.userId,
    });
  };

  const executeIfNoError = () => {
    triggerMessageSentEvent();
  };

  return async (_dispatch, getState = store.initialStates) => {
    (
      await trier(sendPrivateMessage.name).tryAsync(
        tryToSendPrivateMessage,
        getState()
      )
    ).executeIfNoError(executeIfNoError);
  };
};

const getAllPrivateChats = () => {
  const tryToGetAllPrivateChats = async () => {
    const response =
      await apiManager.apis.getAllPrivateChats.sendFullFeaturedRequest();

    return response.data;
  };

  const executeIfNoError = (data, dispatch) => {
    dispatch(
      actions.updateAllPrivateChats({
        privateChats: data.privateChats,
      })
    );
  };

  return async (dispatch) => {
    (
      await trier(getAllPrivateChats.name).tryAsync(tryToGetAllPrivateChats)
    ).executeIfNoError(executeIfNoError, dispatch);
  };
};

const messageControllers = {
  getAllPrivateChats,
  sendPrivateMessage,
};

export { messageControllers };
