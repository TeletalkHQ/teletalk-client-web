import { apiBuilder } from "classes/apiClasses/ApiBuilder";
import { stuffStore } from "classes/StuffStore";
import { apiHandler } from "classes/apiClasses/ApiHandler";

import { addUniqueIdToEachCountry } from "functions/others/apiTransformers";

const {
  addContact,
  createNewUser,
  getAllChatMessages,
  getAllChats,
  getContacts,
  getCountries,
  getUserChatsLastMessage,
  getWelcomeMessage,
  logout,
  sendPrivateMessage,
  signIn,
  userStatusChecker,
  verifySignIn,
} = {
  addContact: "addContact",
  createNewUser: "createNewUser",
  getAllChatMessages: "getAllChatMessages",
  getAllChats: "getAllChats",
  getContacts: "getContacts",
  getCountries: "getCountries",
  getUserChatsLastMessage: "getUserChatsLastMessage",
  getWelcomeMessage: "getWelcomeMessage",
  logout: "logout",
  sendPrivateMessage: "sendPrivateMessage",
  signIn: "signIn",
  userStatusChecker: "userStatusChecker",
  verifySignIn: "verifySignIn",
};

class ApiManager {
  constructor() {
    this.apiTemplate = apiHandler.create({});

    this.apis = {
      addContact: this.apiTemplate,
      createNewUser: this.apiTemplate,
      getAllChatMessages: this.apiTemplate,
      getAllChats: this.apiTemplate,
      getContacts: this.apiTemplate,
      getCountries: this.apiTemplate,
      getUserChatsLastMessage: this.apiTemplate,
      getWelcomeMessage: this.apiTemplate,
      logout: this.apiTemplate,
      sendPrivateMessage: this.apiTemplate,
      signIn: this.apiTemplate,
      userStatusChecker: this.apiTemplate,
      verifySignIn: this.apiTemplate,
    };
  }

  buildApiWithJustRouteObject(routeObject) {
    return apiBuilder.create().setRequirements({ routeObject }).build();
  }

  buildMultipleApiWithJustRouteObject(arrayOfApiNameAndRouteObject) {
    arrayOfApiNameAndRouteObject.forEach(([apiName, routeObject]) => {
      this.apis[apiName] = this.buildApiWithJustRouteObject(routeObject);
    });
  }

  rebuildAllApis() {
    const {
      addContactRoute,
      chatsLastMessageRoute,
      checkUserStatusRoute,
      createNewUserRoute,
      getAllChatsRoute,
      getContactsRoute,
      getPrivateChatMessagesRoute,
      getWelcomeMessageRoute,
      logoutNormalRoute,
      sendMessageRoute,
      signInNormalRoute,
      verifySignInNormalRoute,
    } = stuffStore.routes;

    this.buildMultipleApiWithJustRouteObject([
      [addContact, addContactRoute],
      [createNewUser, createNewUserRoute],
      [getAllChatMessages, getPrivateChatMessagesRoute],
      [getAllChats, getAllChatsRoute],
      [getContacts, getContactsRoute],
      [getUserChatsLastMessage, chatsLastMessageRoute],
      [getWelcomeMessage, getWelcomeMessageRoute],
      [logout, logoutNormalRoute],
      [sendPrivateMessage, sendMessageRoute],
      [signIn, signInNormalRoute],
      [userStatusChecker, checkUserStatusRoute],
      [verifySignIn, verifySignInNormalRoute],
    ]);

    const { getCountriesRoute } = stuffStore.routes;

    this.apis[getCountries] = apiBuilder
      .create()
      .setRequirements({
        routeObject: getCountriesRoute,
        responseTransformer: addUniqueIdToEachCountry,
      })
      .build();
  }
}

const apiManager = new ApiManager();

export { apiManager, ApiManager };
