import { requester } from "functions/utilities/requester";
import { persistentStorage } from "classes/PersistentStorage";
import {
  checkInputFields,
  checkOutputFields,
} from "functions/helpers/inputOutputFieldsChecker";

class ApiBuilder {
  constructor() {
    this.routeObject = {};
  }

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
    token = persistentStorage.getItem({ key: "mainToken" }),
    ...data
  } = {}) {
    checkInputFields(data, this.routeObject.inputFields);

    try {
      const response = await requester({
        data: data,
        ...this.getApiUrlAndMethod(this.routeObject),
        token,
      });

      checkOutputFields(response.data, this.routeObject.outputFields);

      return response;
    } catch (error) {
      console.log(`Api:${this.routeObject.fullUrl} Api catch, error:`, error);

      throw error;
    }
  }
}
const apiBuilder = {
  create: () => new ApiBuilder(),
};

export { apiBuilder, ApiBuilder };
