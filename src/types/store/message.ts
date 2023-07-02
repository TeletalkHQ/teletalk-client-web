import { StoreSetFn } from "..";
import {
  ChatId,
  MessageItem,
  MessageText,
  PrivateChatItem,
  PrivateChats,
  SenderId,
} from "../datatypes";

export interface LeftSidePrivateChatItem {
  messageText: MessageText;
  fullName: string;
  senderId: SenderId;
}

export type LeftSidePrivateChats = LeftSidePrivateChatItem[];

export interface SelectedPrivateChat {
  chatId: ChatId;
}

export interface AddMessagePayload {
  chatId: ChatId;
  addedMessage: MessageItem;
}

export interface MessageState {
  privateChats: PrivateChats;
  selectedChat: SelectedPrivateChat;
  messageInputTextValue: MessageText;
}

export interface MessageHandlers {
  addMessage: (m: AddMessagePayload) => void;
  deselectChat: () => void;
  createNewPrivateChat: (p: PrivateChatItem) => void;
  messageInputOnChange: (v: MessageText) => void;
  selectChat: (id: ChatId) => void;
  setPrivateChats: (p: PrivateChats) => void;
}

export type MessageSetState = StoreSetFn<MessageState>;

export type MessageStore = MessageHandlers & MessageState;
