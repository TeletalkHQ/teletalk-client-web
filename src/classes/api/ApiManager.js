import { objectUtilities } from "utility-store/src/classes/ObjectUtilities";

import { transformers } from "src/api/transformers";

import { apiBuilder } from "src/classes/api/ApiBuilder";
import { apiHandler } from "src/classes/api/ApiHandler";
import { stuffStore } from "src/classes/StuffStore";

import { utilities } from "src/utilities";

class ApiManager {
  #apiTemplate = apiHandler.create({});

  constructor() {
    this.apis = {
      //? This is not necessary, its just for intellisense
      addContact: this.#apiTemplate,
      getUserData: this.#apiTemplate,
      createNewUser: this.#apiTemplate,
      getChatsLastMessage: this.#apiTemplate,
      getContacts: this.#apiTemplate,
      getCountries: this.#apiTemplate,
      getAllPrivateChats: this.#apiTemplate,
      getPublicUserInfo: this.#apiTemplate,
      getWelcomeMessage: this.#apiTemplate,
      logoutNormal: this.#apiTemplate,
      sendPrivateMessage: this.#apiTemplate,
      signInNormal: this.#apiTemplate,
      verifySignInNormal: this.#apiTemplate,
    };
  }

  #buildWithRouteObject() {
    const routes = utilities.excludeVersion(stuffStore.routes);
    objectUtilities.objectEntries(routes).forEach(([apiName, routeObject]) => {
      this.apis[apiName] = apiBuilder
        .create()
        .setRequirements({ routeObject })
        .build();
    });
  }

  build() {
    this.#buildWithRouteObject();

    this.apis["getCountries"] = apiBuilder
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
