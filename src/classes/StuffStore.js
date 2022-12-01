class StuffStore {
  constructor() {
    this.errors = {};
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
  updateValidationModels(validationModels) {
    this.validationModels = validationModels;
    return this;
  }
  updateLanguageData(languageData) {
    this.languageData = languageData;
    return this;
  }
  updateStore({ errors, languageData, models, routes, validationModels }) {
    this.updateErrors(errors)
      .updateModels(models)
      .updateRoutes(routes)
      .updateLanguageData(languageData)
      .updateValidationModels(validationModels);
  }
}

const stuffStore = new StuffStore();

export { stuffStore };
