import { transformers } from "~/api/transformers";
import { stuffStore } from "~/classes/StuffStore";
import { apiBuilder } from "~/classes/api/ApiBuilder";
import { apiHandler } from "~/classes/api/ApiHandler";

class ApiManager {
  #apiTemplate = apiHandler.create({});

  constructor() {
    this.apis = {
      addContact: this.#apiTemplate,
      createNewUser: this.#apiTemplate,
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

  #buildWithRoute() {
    const routes = stuffStore.routes;
    Object.entries(routes).forEach(([apiName, route]) => {
      this.apis[apiName] = apiBuilder
        .create()
        .setRequirements({ route })
        .build();
    });
  }

  build() {
    this.#buildWithRoute();

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
