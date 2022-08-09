import { apiBuilder } from "classes/Builders/ApiBuilder";
import { stuffStore } from "classes/StuffStore";

const {
  chatsLastMessageRoute,
  getAllChatsRoute,
  getPrivateChatMessagesRoute,
  sendMessageRoute,
} = stuffStore.routes;

const sendPrivateMessageApi = apiBuilder
  .create()
  .setRequirements(sendMessageRoute)
  .build();

const getUserChatsLastMessageApi = apiBuilder
  .create()
  .setRequirements(chatsLastMessageRoute)
  .build();

const getAllChatsApi = apiBuilder
  .create()
  .setRequirements(getAllChatsRoute)
  .build();

const getAllChatMessagesApi = apiBuilder
  .create()
  .setRequirements(getPrivateChatMessagesRoute)
  .build();

export {
  getAllChatMessagesApi,
  getAllChatsApi,
  getUserChatsLastMessageApi,
  sendPrivateMessageApi,
};
