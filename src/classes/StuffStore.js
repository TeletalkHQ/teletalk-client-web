import { PERSISTENT_STORAGE_KEYS } from "variables/others/staticValues";
import { persistentStorage } from "classes/PersistentStorage";

class StuffStore {
  constructor() {
    this.stuffs = persistentStorage.getAndConvertItem(
      PERSISTENT_STORAGE_KEYS.STUFFS
    );
    this.errors = this.stuffs.errors;
    this.models = this.stuffs.models;
    this.routes = this.stuffs.routes;
    this.validationModels = {};
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
  updateAllStuff(errors, models, routes, validationModels) {
    this.updateErrors(errors)
      .updateModels(models)
      .updateRoutes(routes)
      .updateValidationModels(validationModels);
  }
}

const stuffStore = new StuffStore();

export { stuffStore };
