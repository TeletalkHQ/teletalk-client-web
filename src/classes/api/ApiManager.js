import { objectUtilities } from "utility-store/src/classes/ObjectUtilities";

import { apiBuilder } from "classes/api/ApiBuilder";
import { apiHandler } from "classes/api/ApiHandler";
import { stuffStore } from "classes/StuffStore";

import { transformers } from "api/transformers";

class ApiManager {
  #apiTemplate = apiHandler.create({});

  constructor() {
    this.apis = {
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
    const { version, ...routes } = stuffStore.routes;

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
