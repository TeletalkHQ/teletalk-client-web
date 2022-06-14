import allStuff from "../temp/allStuff.json";

class StuffStore {
  constructor() {
    this.errors = allStuff.errors;
    this.models = allStuff.models;
    this.routes = allStuff.routes;
    this.validationModels = {};
  }
}

const stuffStore = new StuffStore();

export { stuffStore };
