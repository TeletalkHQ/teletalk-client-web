class StuffStore {
  constructor() {
    this.errors = {};
    this.models = {};
    this.routes = {};
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
  updateAllStuff({ errors, languageData, models, routes, validationModels }) {
    this.updateErrors(errors)
      .updateModels(models)
      .updateRoutes(routes)
      .updateLanguageData(languageData)
      .updateValidationModels(validationModels);
  }
}

const stuffStore = new StuffStore();

export { stuffStore };
