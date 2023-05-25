import stuff from "~/data/stuff.json";

class StuffStore {
  errors = stuff.errors;
  events = stuff.routes;
  models = stuff.models;
  validationModels = stuff.validationModels;

  getStore() {
    return {
      errors: this.errors,
      models: this.models,
      events: this.events,
      validationModels: this.validationModels,
    };
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

  updateStore(data: typeof stuff) {
    this.errors = data.errors;
    this.models = data.models;
    this.validationModels = data.validationModels;
    this.events = data.routes;
  }
}

export const stuffStore = new StuffStore();
