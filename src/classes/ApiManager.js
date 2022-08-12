import { apiBuilder } from "classes/Builders/ApiBuilder";
import { stuffStore } from "classes/StuffStore";
import { randomMaker } from "classes/RandomMaker";

class ApiManager {
  constructor() {
    this.apiTemplate = apiBuilder.create();

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

    this.apis.authApis.verifySignInApi = apiBuilder
      .create()
      .setRequirements(verifySignInNormalRoute)
      .build();
    this.apis.authApis.userStatusCheckerApi = apiBuilder
      .create()
      .setRequirements(statusCheckRoute)
      .build();
    this.apis.authApis.signInApi = apiBuilder
      .create()
      .setRequirements(signInNormalRoute)
      .build();
    this.apis.authApis.logoutApi = apiBuilder
      .create()
      .setRequirements(logoutNormalRoute)
      .build();
    this.apis.authApis.createNewUserApi = apiBuilder
      .create()
      .setRequirements(createNewUserRoute)
      .build();
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

    this.apis.cellphoneApis.getContactsApi = apiBuilder
      .create()
      .setRequirements(getContactsRoute)
      .build();
    this.apis.cellphoneApis.addContactApi = apiBuilder
      .create()
      .setRequirements(addContactRoute)
      .build();
  }

  buildMessageApis() {
    const {
      chatsLastMessageRoute,
      getAllChatsRoute,
      getPrivateChatMessagesRoute,
      sendMessageRoute,
    } = stuffStore.routes;

    this.apis.messageApis.sendPrivateMessageApi = apiBuilder
      .create()
      .setRequirements(sendMessageRoute)
      .build();

    this.apis.messageApis.getUserChatsLastMessageApi = apiBuilder
      .create()
      .setRequirements(chatsLastMessageRoute)
      .build();

    this.apis.messageApis.getAllChatsApi = apiBuilder
      .create()
      .setRequirements(getAllChatsRoute)
      .build();

    this.apis.messageApis.getAllChatMessagesApi = apiBuilder
      .create()
      .setRequirements(getPrivateChatMessagesRoute)
      .build();
  }

  buildOtherApis() {
    const { countriesRoute, welcomeRoute } = stuffStore.routes;

    this.apis.otherApis.welcomeMessageApi = apiBuilder
      .create()
      .setRequirements(welcomeRoute)
      .build();

    this.apis.otherApis.getCountriesApi = apiBuilder
      .create()
      .setRequirements(countriesRoute)
      .setResponseTransformer(addUniqueIdToEachCountry)
      .build();
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
