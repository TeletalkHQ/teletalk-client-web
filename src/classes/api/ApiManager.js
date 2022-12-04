import { apiBuilder } from "classes/api/ApiBuilder";
import { apiHandler } from "classes/api/ApiHandler";
import { stuffStore } from "classes/StuffStore";

import { transformers } from "api/transformers";

const {
  addContact,
  getUserData,
  createNewUser,
  getChatsLastMessage,
  getContacts,
  getCountries,
  getPrivateChat,
  getPublicUserInfo,
  getWelcomeMessage,
  logout,
  sendPrivateMessage,
  signIn,
  verifySignIn,
} = {
  addContact: "addContact",
  getUserData: "getUserData",
  createNewUser: "createNewUser",
  getChatsLastMessage: "getChatsLastMessage",
  getContacts: "getContacts",
  getCountries: "getCountries",
  getPrivateChat: "getPrivateChat",
  getPublicUserInfo: "getPublicUserInfo",
  getWelcomeMessage: "getWelcomeMessage",
  logout: "logout",
  sendPrivateMessage: "sendPrivateMessage",
  signIn: "signIn",
  verifySignIn: "verifySignIn",
};

class ApiManager {
  constructor() {
    this.apiTemplate = apiHandler.create({});

    this.apis = {
      addContact: this.apiTemplate,
      getUserData: this.apiTemplate,
      createNewUser: this.apiTemplate,
      getChatsLastMessage: this.apiTemplate,
      getContacts: this.apiTemplate,
      getCountries: this.apiTemplate,
      getAllPrivateChats: this.apiTemplate,
      getPublicUserInfo: this.apiTemplate,
      getWelcomeMessage: this.apiTemplate,
      logout: this.apiTemplate,
      sendPrivateMessage: this.apiTemplate,
      signIn: this.apiTemplate,
      verifySignIn: this.apiTemplate,
    };
  }

  buildWithRouteObject(routeObject) {
    return apiBuilder.create().setRequirements({ routeObject }).build();
  }

  buildMultipleWithRouteObject(arrayOfApiNameAndRouteObject) {
    arrayOfApiNameAndRouteObject.forEach(([apiName, routeObject]) => {
      this.apis[apiName] = this.buildWithRouteObject(routeObject);
    });
  }

  build() {
    this.buildMultipleWithRouteObject([
      [addContact, stuffStore.routes.addContact],
      [getUserData, stuffStore.routes.getUserData],
      [createNewUser, stuffStore.routes.createNewUser],
      [getChatsLastMessage, stuffStore.routes.getChatsLastMessage],
      [getContacts, stuffStore.routes.getContacts],
      [getPrivateChat, stuffStore.routes.getPrivateChat],
      [getPublicUserInfo, stuffStore.routes.getPublicUserInfo],
      [getWelcomeMessage, stuffStore.routes.getWelcomeMessage],
      [logout, stuffStore.routes.logoutNormal],
      [sendPrivateMessage, stuffStore.routes.sendPrivateMessage],
      [signIn, stuffStore.routes.signInNormal],
      [verifySignIn, stuffStore.routes.verifySignInNormal],
    ]);

    this.apis[getCountries] = apiBuilder
      .create()
      .setRequirements({
        responseTransformer: transformers.addUniqueIdToEachCountry,
        routeObject: stuffStore.routes.getCountries,
      })
      .build();
  }
}

const apiManager = new ApiManager();

export { apiManager, ApiManager };
