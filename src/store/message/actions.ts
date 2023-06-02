import { actionHandler } from "~/classes/ActionHandler";

import { MESSAGE_ACTION_TYPES } from "~/store/message/types";

const addNewMessage = (payload) =>
  actionHandler(MESSAGE_ACTION_TYPES.ADD_NEW_MESSAGE, payload);

const closeRightSide = (payload) =>
  actionHandler(MESSAGE_ACTION_TYPES.CLOSE_RIGHT_SIDE, payload);

const createNewPrivateChat = (payload) =>
  actionHandler(MESSAGE_ACTION_TYPES.CREATE_NEW_PRIVATE_CHAT, payload);

const messageInputOnChange = (payload) =>
  actionHandler(MESSAGE_ACTION_TYPES.MESSAGE_INPUT_ONCHANGE, payload);

const resetMessageState = () =>
  actionHandler(MESSAGE_ACTION_TYPES.RESET_MESSAGE_STATE);

const selectedChat = (payload) =>
  actionHandler(MESSAGE_ACTION_TYPES.SELECTED_CHAT, payload);

const updateAllPrivateChats = (payload) =>
  actionHandler(MESSAGE_ACTION_TYPES.UPDATE_ALL_PRIVATE_CHATS, payload);

const updateOnePrivateChat = (payload) =>
  actionHandler(MESSAGE_ACTION_TYPES.UPDATE_ONE_PRIVATE_CHAT, payload);

const messageActions = {
  addNewMessage,
  closeRightSide,
  createNewPrivateChat,
  messageInputOnChange,
  resetMessageState,
  selectedChat,
  updateAllPrivateChats,
  updateOnePrivateChat,
};

export { messageActions };
