// import models from "temp/models.json";
// import routes from "temp/routes.json";
// import errors from "temp/errors.json";

class StuffStore {
  constructor() {
    this.errors = {};
    this.models = {};
    this.routes = {};
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
}

const stuffStore = new StuffStore();

export { stuffStore };
