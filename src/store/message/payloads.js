import { MESSAGE_ACTION_TYPES } from "src/store/message/types";
import { fields } from "src/store/fields";

const messageActionPayloads = {
  [MESSAGE_ACTION_TYPES.ADD_NEW_MESSAGE]: {
    chatId: fields.single.chatId,
    newMessage: fields.statics.object(fields.collection.messageItem),
  },

  [MESSAGE_ACTION_TYPES.CLOSE_RIGHT_SIDE]: undefined,

  [MESSAGE_ACTION_TYPES.CREATE_NEW_PRIVATE_CHAT]: {
    privateChat: fields.collection.privateChat,
  },

  [MESSAGE_ACTION_TYPES.MESSAGE_INPUT_ONCHANGE]: {
    messageInputTextValue: fields.single.messageInputTextValue,
  },

  [MESSAGE_ACTION_TYPES.RESET_MESSAGE_STATE]: undefined,

  [MESSAGE_ACTION_TYPES.UPDATE_ALL_PRIVATE_CHATS]: {
    privateChats: fields.statics.array(fields.collection.privateChatItem),
  },

  [MESSAGE_ACTION_TYPES.SELECTED_USER_FOR_PRIVATE_CHAT]: {
    userId: fields.single.userId,
  },
};

export { messageActionPayloads };
