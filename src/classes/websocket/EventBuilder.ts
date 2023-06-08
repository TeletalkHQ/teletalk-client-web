import lodash from "lodash";
import { errorThrower } from "utility-store";

import { eventHandler } from "~/classes/websocket/EventHandler";

import { variables } from "~/variables";

class EventBuilder {
  constructor() {
    this.requirements = {
      requestInterceptors: [],
      requestTransformer: (data) => data,
      responseInterceptors: [],
      responseTransformer: (data) => data,
      route: {},
    };
  }

  setRequirements(requirements) {
    Object.entries(requirements).forEach(([key, value]) => {
      this[`set${lodash.upperFirst(key)}`](value);
    });
    return this;
  }
  setRoute(route) {
    this.requirements.route = route;
    return this;
  }
  setRequestInterceptors(...callbacks) {
    this.requirements.requestInterceptors = callbacks;
    return this;
  }
  setResponseInterceptors(...callbacks) {
    this.requirements.responseInterceptors = callbacks;
    return this;
  }
  setRequestTransformer(callback = this.requestTransformer) {
    this.requirements.requestTransformer = callback;
    return this;
  }
  setResponseTransformer(callback = this.responseTransformer) {
    this.requirements.responseTransformer = callback;
    return this;
  }

  checkMinimumRequirements() {
    errorThrower(!this.requirements.route.name, {
      ...variables.notification.error.EVENT_IS_BROKEN,
      requirements: this.requirements,
    });
  }
  build() {
    this.checkMinimumRequirements();

    return eventHandler.create(this.requirements);
  }
}

const eventBuilder = {
  create: () => new EventBuilder(),
};

export { eventBuilder, EventBuilder };
