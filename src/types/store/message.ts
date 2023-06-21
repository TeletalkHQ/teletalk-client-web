import { Id, StoreSetFn } from "..";

export type CreatedAt = number;

export type MessageText = string;

export type MessageId = Id;

export interface Sender {
  senderId: Id;
}

export interface MessageItem {
  createdAt: CreatedAt;
  messageId: Id;
  messageText: MessageText;
  sender: Sender;
}

export interface ParticipantItem {
  participantId: Id;
}

export type Messages = MessageItem[];

export type Participants = ParticipantItem[];

export interface PrivateChatItem {
  chatId: Id;
  createdAt: CreatedAt;
  messages: Messages;
  participants: Participants;
}
export type PrivateChats = PrivateChatItem[];

export type PrivateChatId = PrivateChatItem["chatId"];

interface SelectedChat {
  id: PrivateChatId;
}

export interface AddMessagePayload {
  chatId: PrivateChatId;
  addedMessage: {
    createdAt: CreatedAt;
    messageText: MessageText;
    messageId: MessageId;
    sender: Sender;
  };
}

export interface MessageState {
  privateChats: PrivateChats;
  selectedChat: SelectedChat;
}

export interface MessageHandlers {
  setPrivateChats: (p: PrivateChats) => void;
  closeRightSide: () => void;
  addMessage: (m: AddMessagePayload) => void;
  selectChat: (id: PrivateChatId) => void;
  createNewPrivateChat: (p: PrivateChatItem) => void;
}

export type MessageSetState = StoreSetFn<MessageState>;

export type MessageStore = MessageHandlers & MessageState;
