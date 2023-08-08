import { ChatId, UserId } from "~/types";

export type HandleChatListItemClick = (data: {
  userId: UserId;
  chatId: ChatId;
}) => void;
