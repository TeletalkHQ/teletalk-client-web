import { apiHandler } from "classes/apiClasses/ApiHandler";

import { errorThrower } from "functions/utilities/otherUtilities";

import { notifications } from "variables/others/notifications";

class ApiBuilder {
  constructor() {
    this.requirements = {
      requestDefaultData: {},
      requestInterceptorsArray: [],
      requestTransformer: (data) => data,
      responseInterceptorsArray: [],
      responseTransformer: (data) => data,
      routeObject: {},
    };
  }

  setRequirements(
    routeObject = this.requirements.routeObject,
    requestDefaultData = this.requirements.requestDefaultData,
    requestTransformer = this.requirements.requestTransformer,
    responseTransformer = this.requirements.responseTransformer,
    requestInterceptorsArray = this.requirements.requestInterceptorsArray,
    responseInterceptorsArray = this.requirements.responseInterceptorsArray
  ) {
    this.setRouteObject(routeObject);
    this.setRequestDefaultData(requestDefaultData);
    this.setRequestTransformer(requestTransformer);
    this.setResponseTransformer(responseTransformer);
    this.setRequestInterceptors(...requestInterceptorsArray);
    this.setResponseInterceptors(...responseInterceptorsArray);

    return this;
  }
  setRouteObject(routeObject) {
    this.requirements.routeObject = routeObject;
    return this;
  }
  setRequestDefaultData(data) {
    this.requirements.requestDefaultData = data;
    return this;
  }
  setRequestInterceptors(...callbacks) {
    this.requirements.requestInterceptorsArray = callbacks;
    return this;
  }
  setResponseInterceptors(...callbacks) {
    this.requirements.responseInterceptorsArray = callbacks;
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

  #checkRequirements() {
    errorThrower(
      !this.requirements.routeObject?.fullUrl,
      notifications.localErrors.URL_NOT_FOUND
    );
  }
  build() {
    this.#checkRequirements();

    const api = apiHandler.create(this.requirements);
    return api;
  }
}

const apiBuilder = {
  create: () => new ApiBuilder(),
};

export { apiBuilder, ApiBuilder };
