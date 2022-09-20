import { apiBuilder } from "classes/apiClasses/ApiBuilder";
import { stuffStore } from "classes/StuffStore";
import { apiHandler } from "classes/apiClasses/ApiHandler";

import { addUniqueIdToEachCountry } from "functions/otherFunctions/apiTransformers";

const { authApis, cellphoneApis, messageApis, otherApis } = {
  authApis: "authApis",
  cellphoneApis: "cellphoneApis",
  messageApis: "messageApis",
  otherApis: "otherApis",
};
const {
  addContactApi,
  createNewUserApi,
  getAllChatMessagesApi,
  getAllChatsApi,
  getContactsApi,
  getCountriesApi,
  getUserChatsLastMessageApi,
  logoutApi,
  sendPrivateMessageApi,
  signInApi,
  userStatusCheckerApi,
  verifySignInApi,
  getWelcomeMessageApi,
} = {
  addContactApi: "addContactApi",
  createNewUserApi: "createNewUserApi",
  getAllChatMessagesApi: "getAllChatMessagesApi",
  getAllChatsApi: "getAllChatsApi",
  getContactsApi: "getContactsApi",
  getCountriesApi: "getCountriesApi",
  getUserChatsLastMessageApi: "getUserChatsLastMessageApi",
  logoutApi: "logoutApi",
  sendPrivateMessageApi: "sendPrivateMessageApi",
  signInApi: "signInApi",
  userStatusCheckerApi: "userStatusCheckerApi",
  verifySignInApi: "verifySignInApi",
  getWelcomeMessageApi: "getWelcomeMessageApi",
};

class ApiManager {
  constructor() {
    this.apiTemplate = apiHandler.create({});

    this.apis = {
      authApis: {
        createNewUserApi: this.apiTemplate,
        logoutApi: this.apiTemplate,
        signInApi: this.apiTemplate,
        userStatusCheckerApi: this.apiTemplate,
        verifySignInApi: this.apiTemplate,
      },
      cellphoneApis: {
        addContactApi: this.apiTemplate,
        getContactsApi: this.apiTemplate,
      },
      messageApis: {
        getAllChatMessagesApi: this.apiTemplate,
        getAllChatsApi: this.apiTemplate,
        getUserChatsLastMessageApi: this.apiTemplate,
        sendPrivateMessageApi: this.apiTemplate,
      },
      otherApis: {
        getCountriesApi: this.apiTemplate,
        getWelcomeMessageApi: this.apiTemplate,
      },
    };
  }

  buildApiWithJustRouteObject(routeObject) {
    return apiBuilder.create().setRequirements({ routeObject }).build();
  }
  buildMultipleApiWithJustRouteObject(parentKey, arrayOfApiNameAndRouteObject) {
    arrayOfApiNameAndRouteObject.forEach(([apiName, routeObject]) => {
      this.apis[parentKey][apiName] =
        this.buildApiWithJustRouteObject(routeObject);
    });
  }

  rebuildAllApis() {
    this.buildAuthApis();
    this.buildCellphoneApis();
    this.buildMessageApis();
    this.buildOtherApis();
  }

  buildAuthApis() {
    const {
      checkUserStatusRoute,
      createNewUserRoute,
      logoutNormalRoute,
      signInNormalRoute,
      verifySignInNormalRoute,
    } = stuffStore.routes;

    this.buildMultipleApiWithJustRouteObject(authApis, [
      [verifySignInApi, verifySignInNormalRoute],
      [userStatusCheckerApi, checkUserStatusRoute],
      [signInApi, signInNormalRoute],
      [logoutApi, logoutNormalRoute],
      [createNewUserApi, createNewUserRoute],
    ]);
  }

  buildCellphoneApis() {
    const {
      // addBlockRoute,
      // addBlocksRoute,
      addContactRoute,
      // addContactsRoute,
      // editContactRoute,
      getContactsRoute,
      // removeBlockRoute,
      // removeBlocksRoute,
      // removeContactRoute,
      // removeContactsRoute,
      // shareContactRoute,
      // shareContactsRoute,
    } = stuffStore.routes;

    this.buildMultipleApiWithJustRouteObject(cellphoneApis, [
      [getContactsApi, getContactsRoute],
      [addContactApi, addContactRoute],
    ]);
  }

  buildMessageApis() {
    const {
      chatsLastMessageRoute,
      getAllChatsRoute,
      getPrivateChatMessagesRoute,
      sendMessageRoute,
    } = stuffStore.routes;

    this.buildMultipleApiWithJustRouteObject(messageApis, [
      [sendPrivateMessageApi, sendMessageRoute],
      [getUserChatsLastMessageApi, chatsLastMessageRoute],
      [getAllChatsApi, getAllChatsRoute],
      [getAllChatMessagesApi, getPrivateChatMessagesRoute],
    ]);
  }

  buildOtherApis() {
    const { getCountriesRoute, getWelcomeMessageRoute } = stuffStore.routes;

    this.apis.otherApis[getCountriesApi] = apiBuilder
      .create()
      .setRequirements({
        routeObject: getCountriesRoute,
        responseTransformer: addUniqueIdToEachCountry,
      })
      .build();

    this.buildMultipleApiWithJustRouteObject(otherApis, [
      [getWelcomeMessageApi, getWelcomeMessageRoute],
    ]);
  }
}

const apiManager = new ApiManager();

export { apiManager, ApiManager };
