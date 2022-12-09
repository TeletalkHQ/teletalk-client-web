import { MESSAGE_ACTION_TYPES } from "store/message/types";
import { fields } from "store/fields";

const messageActionPayloads = {
  [MESSAGE_ACTION_TYPES.UPDATE_ALL_PRIVATE_CHATS]: {
    privateChats: fields.statics.array({
      chatId: fields.single.chatId,
      messages: fields.collection.messages,
      participants: fields.collection.participants,
    }),
  },
  [MESSAGE_ACTION_TYPES.RESET_MESSAGE_STATE]: undefined,
  [MESSAGE_ACTION_TYPES.SELECTED_USER_FOR_PRIVATE_CHAT]: {
    userId: fields.single.userId,
  },
  [MESSAGE_ACTION_TYPES.MESSAGE_INPUT_ONCHANGE]: {
    messageInputTextValue: fields.single.messageInputTextValue,
  },
  [MESSAGE_ACTION_TYPES.CLOSE_RIGHT_SIDE]: undefined,
};

export { messageActionPayloads };