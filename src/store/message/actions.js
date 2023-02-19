import { actionHandler } from "src/classes/ActionHandler";

import { MESSAGE_ACTION_TYPES } from "src/store/message/types";

const addNewMessage = (payload) =>
  actionHandler(MESSAGE_ACTION_TYPES.ADD_NEW_MESSAGE, payload);

const closeRightSide = (payload) =>
  actionHandler(MESSAGE_ACTION_TYPES.CLOSE_RIGHT_SIDE, payload);

const messageInputOnChange = (payload) =>
  actionHandler(MESSAGE_ACTION_TYPES.MESSAGE_INPUT_ONCHANGE, payload);

const selectedUserForPrivateChat = (payload) =>
  actionHandler(MESSAGE_ACTION_TYPES.SELECTED_USER_FOR_PRIVATE_CHAT, payload);

const updateAllPrivateChats = (payload) =>
  actionHandler(MESSAGE_ACTION_TYPES.UPDATE_ALL_PRIVATE_CHATS, payload);

const updateOnePrivateChat = (payload) =>
  actionHandler(MESSAGE_ACTION_TYPES.UPDATE_ONE_PRIVATE_CHAT, payload);

const createNewPrivateChat = (payload) =>
  actionHandler(MESSAGE_ACTION_TYPES.CREATE_NEW_PRIVATE_CHAT, payload);

const messageActions = {
  addNewMessage,
  closeRightSide,
  createNewPrivateChat,
  messageInputOnChange,
  selectedUserForPrivateChat,
  updateAllPrivateChats,
  updateOnePrivateChat,
};

export { messageActions };
