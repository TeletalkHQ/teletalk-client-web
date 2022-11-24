import { apiBuilder } from "classes/api/ApiBuilder";
import { apiHandler } from "classes/api/ApiHandler";
import { stuffStore } from "classes/StuffStore";

import { addUniqueIdToEachCountry } from "functions/others/apiTransformers";

const {
  addContact,
  createNewUser,
  getPrivateChatMessages,
  getChatInfo,
  getContacts,
  getCountries,
  getUserChatsLastMessage,
  getWelcomeMessage,
  logout,
  sendPrivateMessage,
  signIn,
  checkUserStatus,
  verifySignIn,
} = {
  addContact: "addContact",
  createNewUser: "createNewUser",
  getPrivateChatMessages: "getPrivateChatMessages",
  getChatInfo: "getChatInfo",
  getContacts: "getContacts",
  getCountries: "getCountries",
  getUserChatsLastMessage: "getUserChatsLastMessage",
  getWelcomeMessage: "getWelcomeMessage",
  logout: "logout",
  sendPrivateMessage: "sendPrivateMessage",
  signIn: "signIn",
  checkUserStatus: "checkUserStatus",
  verifySignIn: "verifySignIn",
};

class ApiManager {
  constructor() {
    this.apiTemplate = apiHandler.create({});

    this.apis = {
      addContact: this.apiTemplate,
      createNewUser: this.apiTemplate,
      getPrivateChatMessages: this.apiTemplate,
      getChatInfo: this.apiTemplate,
      getContacts: this.apiTemplate,
      getCountries: this.apiTemplate,
      getUserChatsLastMessage: this.apiTemplate,
      getWelcomeMessage: this.apiTemplate,
      logout: this.apiTemplate,
      sendPrivateMessage: this.apiTemplate,
      signIn: this.apiTemplate,
      checkUserStatus: this.apiTemplate,
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
    this.buildMultipleApiWithJustRouteObject([
      [addContact, stuffStore.routes.addContact],
      [createNewUser, stuffStore.routes.createNewUser],
      [getPrivateChatMessages, stuffStore.routes.getPrivateChatMessages],
      [getChatInfo, stuffStore.routes.getChatInfo],
      [getContacts, stuffStore.routes.getContacts],
      [getUserChatsLastMessage, stuffStore.routes.chatsLastMessage],
      [getWelcomeMessage, stuffStore.routes.getWelcomeMessage],
      [logout, stuffStore.routes.logoutNormal],
      [sendPrivateMessage, stuffStore.routes.sendPrivateMessage],
      [signIn, stuffStore.routes.signInNormal],
      [checkUserStatus, stuffStore.routes.checkUserStatus],
      [verifySignIn, stuffStore.routes.verifySignInNormal],
    ]);

    this.apis[getCountries] = apiBuilder
      .create()
      .setRequirements({
        routeObject: stuffStore.routes.getCountries,
        responseTransformer: addUniqueIdToEachCountry,
      })
      .build();
  }
}

const apiManager = new ApiManager();

export { apiManager, ApiManager };
