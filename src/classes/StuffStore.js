import models from "temp/models.json";
import routes from "temp/routes.json";
import errors from "temp/errors.json";

class StuffStore {
  constructor() {
    this.errors = errors.errors;
    this.models = models.models;
    this.routes = routes.routes;
    this.validationModels = {};
  }
}

const stuffStore = new StuffStore();

export { stuffStore };
