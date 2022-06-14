import { apiManager } from "classes/ApiManager";

const {
  privateChatRouteBaseUrl,
  chatsLastMessageRoute,
  getAllChatsRoute,
  getPrivateChatMessagesRoute,
  sendMessageRoute,
} = {};

const sendPrivateMessageApi = apiManager
  .create()
  .setRequirements()
  .build(privateChatRouteBaseUrl, sendMessageRoute);

const getUserChatsLastMessageApi = apiManager
  .create()
  .setRequirements()
  .build(privateChatRouteBaseUrl, chatsLastMessageRoute);

const getAllChatsApi = apiManager
  .create()
  .setRequirements()
  .build(privateChatRouteBaseUrl, getAllChatsRoute);

const getAllChatMessagesApi = apiManager
  .create()
  .setRequirements(privateChatRouteBaseUrl, getPrivateChatMessagesRoute)
  .build();

export {
  getAllChatMessagesApi,
  sendPrivateMessageApi,
  getUserChatsLastMessageApi,
  getAllChatsApi,
};
