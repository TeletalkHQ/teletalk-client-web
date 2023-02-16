import lodash from "lodash";

class StuffStore {
  constructor() {
    this.errors = {};
    this.events = {};
    this.languageData = {
      errorMessages: {},
    };
    this.models = {};
    this.routes = {};
    this.validationModels = {};
  }

  getStore() {
    return {
      errors: this.errors,
      languageData: this.languageData,
      models: this.models,
      routes: this.routes,
      validationModels: this.validationModels,
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
  updateEvents(events) {
    this.events = events;
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
  updateStore(data) {
    Object.entries(data).forEach(([key, value]) => {
      this[`update${lodash.upperFirst(key)}`](value);
    });
  }
}

const stuffStore = new StuffStore();

export { stuffStore };
