import { Id, StoreSetFn } from "..";

export type CreatedAt = number;

export type MessageText = string;

export type MessageId = Id;
interface Sender {
  senderId: Id;
}

interface MessageItem {
  createdAt: CreatedAt;
  messageId: Id;
  messageText: MessageText;
  sender: Sender;
}

interface ParticipantItem {
  participantId: Id;
}

type Messages = MessageItem[];

type Participants = ParticipantItem[];

interface PrivateChatItem {
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
