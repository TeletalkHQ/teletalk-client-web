import { apiBuilder } from "classes/ApiBuilder";
import { stuffStore } from "classes/StuffStore";

const {
  privateChatRouteBaseUrl,
  chatsLastMessageRoute,
  getAllChatsRoute,
  getPrivateChatMessagesRoute,
  sendMessageRoute,
} = stuffStore.routes;

const sendPrivateMessageApi = apiBuilder
  .create()
  .setRequirements()
  .build(privateChatRouteBaseUrl, sendMessageRoute);

const getUserChatsLastMessageApi = apiBuilder
  .create()
  .setRequirements()
  .build(privateChatRouteBaseUrl, chatsLastMessageRoute);

const getAllChatsApi = apiBuilder
  .create()
  .setRequirements()
  .build(privateChatRouteBaseUrl, getAllChatsRoute);

const getAllChatMessagesApi = apiBuilder
  .create()
  .setRequirements(privateChatRouteBaseUrl, getPrivateChatMessagesRoute)
  .build();

export {
  getAllChatMessagesApi,
  sendPrivateMessageApi,
  getUserChatsLastMessageApi,
  getAllChatsApi,
};
