import { persistentStorage } from "classes/PersistentStorage";

import { PERSISTENT_STORAGE_KEYS } from "variables/otherVariables/helpers";

class StuffStore {
  constructor() {
    this.stuffs = persistentStorage.getAndParseItem(
      PERSISTENT_STORAGE_KEYS.STUFFS
    );
    this.errors = this.stuffs.errors;
    this.models = this.stuffs.models;
    this.routes = this.stuffs.routes;
    this.validationModels = {};
    this.languageData = {
      errorMessages: {},
    };
  }

  updateRoutes(routes) {
    this.routes = routes;
    return this;
  }
  updateModels(models) {
    this.models = models;
    return this;
  }
  updateErrors(errors) {
    this.errors = errors;
    return this;
  }
  updateValidationModels(validationModels) {
    this.validationModels = validationModels;
    return this;
  }
  updateLanguageData(languageData) {
    this.languageData = languageData;
    return this;
  }
  updateAllStuff(errors, models, routes, validationModels, languageData) {
    this.updateErrors(errors)
      .updateModels(models)
      .updateRoutes(routes)
      .updateLanguageData(languageData)
      .updateValidationModels(validationModels);
  }
}

const stuffStore = new StuffStore();

export { stuffStore };
