import { ChatId, UserId, VoidWithArg } from "~/types";

export type HandleChatListItemClick = VoidWithArg<{
  userId: UserId;
  chatId: ChatId;
}>;
