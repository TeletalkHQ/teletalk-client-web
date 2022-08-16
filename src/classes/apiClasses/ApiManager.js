import { apiBuilder } from "classes/apiClasses/ApiBuilder";
import { stuffStore } from "classes/StuffStore";
import { apiHandler } from "classes/apiClasses/ApiHandler";

import { addUniqueIdToEachCountry } from "functions/others/apiTransformers";

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
  welcomeMessageApi,
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
  welcomeMessageApi: "welcomeMessageApi",
};

class ApiManager {
  constructor() {
    this.apiTemplate = apiHandler.create({});

    this.apis = {
      authApis: {
        [createNewUserApi]: this.apiTemplate,
        [logoutApi]: this.apiTemplate,
        [signInApi]: this.apiTemplate,
        [userStatusCheckerApi]: this.apiTemplate,
        [verifySignInApi]: this.apiTemplate,
      },
      cellphoneApis: {
        [addContactApi]: this.apiTemplate,
        [getContactsApi]: this.apiTemplate,
      },
      messageApis: {
        [getAllChatMessagesApi]: this.apiTemplate,
        [getAllChatsApi]: this.apiTemplate,
        [getUserChatsLastMessageApi]: this.apiTemplate,
        [sendPrivateMessageApi]: this.apiTemplate,
      },
      otherApis: {
        [getCountriesApi]: this.apiTemplate,
        [welcomeMessageApi]: this.apiTemplate,
      },
    };
  }

  buildApiWithJustRouteObject(routeObject) {
    return apiBuilder.create().setRequirements({ routeObject }).build();
  }
  buildMultipleApiWithJustRouteObject(
    parentKey,
    arrayOfRouteObjectValueAndKey
  ) {
    arrayOfRouteObjectValueAndKey.forEach(
      ([routeObjectKey, routeObjectValue]) => {
        this.apis[parentKey][routeObjectKey] =
          this.buildApiWithJustRouteObject(routeObjectValue);
      }
    );
  }

  rebuildAllApis() {
    this.buildAuthApis();
    this.buildCellphoneApis();
    this.buildMessageApis();
    this.buildOtherApis();
  }

  buildAuthApis() {
    const {
      createNewUserRoute,
      logoutNormalRoute,
      signInNormalRoute,
      statusCheckRoute,
      verifySignInNormalRoute,
    } = stuffStore.routes;

    this.buildMultipleApiWithJustRouteObject(authApis, [
      [verifySignInApi, verifySignInNormalRoute],
      [userStatusCheckerApi, statusCheckRoute],
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
    const { countriesRoute, welcomeRoute } = stuffStore.routes;

    this.apis.otherApis.getCountriesApi = apiBuilder
      .create()
      .setRequirements({ routeObject: countriesRoute })
      .setResponseTransformer(addUniqueIdToEachCountry)
      .build();

    this.buildMultipleApiWithJustRouteObject(otherApis, [
      [welcomeMessageApi, welcomeRoute],
    ]);
  }
}

const apiManager = new ApiManager();

export { apiManager, ApiManager };
