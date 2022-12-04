import { actionHandler } from "classes/ActionHandler";

import { MESSAGE_ACTION_TYPES } from "store/message/types";

const closeRightSide = (payload) =>
  actionHandler(MESSAGE_ACTION_TYPES.CLOSE_RIGHT_SIDE, payload);

const messageInputOnChange = (payload) =>
  actionHandler(MESSAGE_ACTION_TYPES.MESSAGE_INPUT_ONCHANGE, payload);

const selectedUserForPrivateChat = (payload) =>
  actionHandler(MESSAGE_ACTION_TYPES.SELECTED_USER_FOR_PRIVATE_CHAT, payload);

const updateAllPrivateChats = (payload) =>
  actionHandler(MESSAGE_ACTION_TYPES.UPDATE_ALL_PRIVATE_CHATS, payload);

const messageActions = {
  closeRightSide,
  messageInputOnChange,
  selectedUserForPrivateChat,
  updateAllPrivateChats,
};

export { messageActions };
