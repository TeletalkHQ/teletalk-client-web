import { apiBuilder } from "classes/apiClasses/ApiBuilder";
import { stuffStore } from "classes/StuffStore";
import { randomMaker } from "classes/RandomMaker";
import { apiHandler } from "classes/apiClasses/ApiHandler";

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
        welcomeMessageApi: this.apiTemplate,
      },
    };
  }

  buildApiWithJustRouteObject(routeObject) {
    return apiBuilder.create().setRequirements(routeObject).build();
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

    this.buildMultipleApiWithJustRouteObject("authApis", [
      ["verifySignInApi", verifySignInNormalRoute],
      ["userStatusCheckerApi", statusCheckRoute],
      ["signInApi", signInNormalRoute],
      ["logoutApi", logoutNormalRoute],
      ["createNewUserApi", createNewUserRoute],
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

    this.buildMultipleApiWithJustRouteObject("cellphoneApis", [
      ["getContactsApi", getContactsRoute],
      ["addContactApi", addContactRoute],
    ]);
  }

  buildMessageApis() {
    const {
      chatsLastMessageRoute,
      getAllChatsRoute,
      getPrivateChatMessagesRoute,
      sendMessageRoute,
    } = stuffStore.routes;

    this.buildMultipleApiWithJustRouteObject("messageApis", [
      ["sendPrivateMessageApi", sendMessageRoute],
      ["getUserChatsLastMessageApi", chatsLastMessageRoute],
      ["getAllChatsApi", getAllChatsRoute],
      ["getAllChatMessagesApi", getPrivateChatMessagesRoute],
    ]);
  }

  buildOtherApis() {
    const { countriesRoute, welcomeRoute } = stuffStore.routes;

    this.apis.otherApis.getCountriesApi = apiBuilder
      .create()
      .setRequirements(countriesRoute)
      .setResponseTransformer(addUniqueIdToEachCountry)
      .build();

    this.buildMultipleApiWithJustRouteObject("otherApis", [
      ["welcomeMessageApi", welcomeRoute],
    ]);
  }
}

const apiManager = new ApiManager();

export { apiManager, ApiManager };

//TODO Move to utilities
const addUniqueIdToEachCountry = (responseData) => {
  return {
    countries: responseData.countries.map((country) => ({
      ...country,
      id: randomMaker.randomId(),
    })),
  };
};
