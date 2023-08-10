import {
  ChatId,
  MessageItem,
  MessageText,
  PrivateChatItem,
  PrivateChats,
  StoreSetFn,
  UserId,
  VoidNoArgsFn,
} from "~/types";

export interface SelectedChatInfo {
  chatId: ChatId;
  userId: UserId;
}

export interface AddMessagePayload {
  chatId: ChatId;
  addedMessage: MessageItem;
}

export interface MessageState {
  privateChats: PrivateChats;
  selectedChatInfo: SelectedChatInfo;
  messageInputTextValue: MessageText;
}

export interface MessageHandlers {
  addMessage: (m: AddMessagePayload) => void;
  addPrivateChat: (p: PrivateChatItem) => void;
  createNewPrivateChat: (p: PrivateChatItem) => void;
  deselectChat: () => void;
  messageInputOnChange: (v: MessageText) => void;
  setPrivateChats: (p: PrivateChats) => void;
  updateSelectedChatInfo: (d: { chatId: ChatId; userId: UserId }) => void;
  reset: VoidNoArgsFn;
}

export type MessageSetState = StoreSetFn<MessageState>;

export type MessageStore = MessageHandlers & MessageState;
