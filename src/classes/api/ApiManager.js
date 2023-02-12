import { transformers } from "src/api/transformers";

import { apiBuilder } from "src/classes/api/ApiBuilder";
import { apiHandler } from "src/classes/api/ApiHandler";
import { stuffStore } from "src/classes/StuffStore";

class ApiManager {
  #apiTemplate = apiHandler.create({});

  constructor() {
    this.apis = {
      addContact: this.#apiTemplate,
      createNewUser: this.#apiTemplate,
      getChatsLastMessage: this.#apiTemplate,
      getContacts: this.#apiTemplate,
      getCountries: this.#apiTemplate,
      getCurrentUserData: this.#apiTemplate,
      getPublicUserData: this.#apiTemplate,
      getWelcomeMessage: this.#apiTemplate,
      logout: this.#apiTemplate,
      updatePublicUserData: this.#apiTemplate,
      signIn: this.#apiTemplate,
      verify: this.#apiTemplate,
    };
  }

  #buildWithRouteObject() {
    const routes = stuffStore.routes;
    Object.entries(routes).forEach(([apiName, route]) => {
      this.apis[apiName] = apiBuilder
        .create()
        .setRequirements({ route })
        .build();
    });
  }

  build() {
    this.#buildWithRouteObject();

    this.apis["getCountries"] = apiBuilder
      .create()
      .setRequirements({
        responseTransformer: transformers.addUniqueIdToEachCountry,
        route: stuffStore.routes.getCountries,
      })
      .build();
  }
}

const apiManager = new ApiManager();

export { apiManager, ApiManager };
