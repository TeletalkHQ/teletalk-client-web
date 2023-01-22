import { apiHandler } from "src/classes/api/ApiHandler";

import { utilities } from "src/utilities";

import { variables } from "src/variables";

class ApiBuilder {
  constructor() {
    this.requirements = {
      requestDefaultData: {},
      requestInterceptors: [],
      requestTransformer: (data) => data,
      responseInterceptors: [],
      responseTransformer: (data) => data,
      route: {},
    };
  }

  setRequirements({
    route = this.requirements.route,
    requestDefaultData = this.requirements.requestDefaultData,
    requestTransformer = this.requirements.requestTransformer,
    responseTransformer = this.requirements.responseTransformer,
    requestInterceptors = this.requirements.requestInterceptors,
    responseInterceptors = this.requirements.responseInterceptors,
  }) {
    this.setRouteObject(route);
    this.setRequestDefaultData(requestDefaultData);
    this.setRequestTransformer(requestTransformer);
    this.setResponseTransformer(responseTransformer);
    this.setRequestInterceptors(...requestInterceptors);
    this.setResponseInterceptors(...responseInterceptors);
    return this;
  }
  setRouteObject(route) {
    this.requirements.route = route;
    return this;
  }
  setRequestDefaultData(data) {
    this.requirements.requestDefaultData = data;
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

  #checkMinimumRequirements() {
    utilities.errorThrower(!this.requirements.route.fullUrl, {
      ...variables.notification.error.URL_NOT_FOUND,
      requirements: this.requirements,
    });
  }
  build() {
    this.#checkMinimumRequirements();

    return apiHandler.create(this.requirements);
  }
}

const apiBuilder = {
  create: () => new ApiBuilder(),
};

export { apiBuilder, ApiBuilder };
