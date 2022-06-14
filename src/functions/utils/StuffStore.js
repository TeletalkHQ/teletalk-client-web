class StuffStore {
  constructor() {
    this.errors = {};
    this.models = {};
    this.routes = {};
    this.validationModels = {};
  }
}

const stuffStore = new StuffStore();

export { stuffStore };
