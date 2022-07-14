import { requester } from "functions/utilities/requester";
import { persistentStorage } from "classes/PersistentStorage";
import {
  checkInputFields,
  checkOutputFields,
} from "functions/helpers/inputOutputFieldsChecker";
import { PERSISTENT_STORAGE_KEYS } from "variables/initials/initialValues/initialValues";

class ApiBuilder {
  constructor() {
    this.routeObject = {};
  }

  #responseInterceptorsArray = [];
  #requestInterceptorsArray = [];
  build() {
    return this;
  }

  getApiUrlAndMethod(route) {
    return {
      url: this.getApiUrl(route),
      method: this.getApiMethod(route),
    };
  }
  getApiMethod(route) {
    return route.method;
  }
  getApiUrl(route) {
    return route.fullUrl;
  }

  setRequirements(routeObject) {
    this.setRouteObject(routeObject);
    return this;
  }
  setRouteObject(routeObject) {
    this.routeObject = routeObject;
    return this;
  }
  setData(data) {
    this.data = data;
    return this;
  }
  async sendRequest({
    token = persistentStorage.getItem(PERSISTENT_STORAGE_KEYS.MAIN_TOKEN),
    ...requestData
  } = {}) {
    checkInputFields(requestData, this.routeObject.inputFields);

    this.executeRequestInterceptors(requestData);

    try {
      const response = await requester({
        data: requestData,
        ...this.getApiUrlAndMethod(this.routeObject),
        token,
      });

      checkOutputFields(response.data, this.routeObject.outputFields);

      this.executeResponseInterceptors(response.data);

      return response;
    } catch (error) {
      console.log(`Api:${this.routeObject.fullUrl} Api catch, error:`, error);

      throw error;
    }
  }

  executeRequestInterceptors(data) {
    this.#requestInterceptorsArray.forEach((interceptor) => {
      interceptor(data);
    });
  }
  executeResponseInterceptors(data) {
    this.#responseInterceptorsArray.forEach((interceptor) => {
      interceptor(data);
    });
  }

  requestInterceptors(...callbacks) {
    this.#requestInterceptorsArray = callbacks;
    return this;
  }

  responseInterceptors(...callbacks) {
    this.#responseInterceptorsArray = callbacks;
    return this;
  }
}
const apiBuilder = {
  create: () => new ApiBuilder(),
};

export { apiBuilder, ApiBuilder };
