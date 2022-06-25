import { requester } from "functions/utilities/requester";
import { persistentStorage } from "classes/PersistentStorage";
import {
  checkInputFields,
  checkOutputFields,
} from "functions/helpers/inputOutputFieldsChecker";

class ApiBuilder {
  constructor() {
    this.baseUrlObject = {};
    this.routeObject = {};
  }

  build() {
    return this;
  }

  getApiUrlAndMethod(baseUrl, route) {
    return {
      url: this.getApiUrl(baseUrl, route),
      method: this.getApiMethod(route),
    };
  }
  getApiMethod(route) {
    return route.method;
  }
  getApiUrl(baseUrl, route) {
    return `${baseUrl.url}${route.url}`;
  }

  setRequirements(baseUrlObject, routeObject) {
    this.setBaseUrlObject(baseUrlObject);
    this.setRouteObject(routeObject);
    return this;
  }
  setBaseUrlObject(baseUrlObject) {
    this.baseUrlObject = baseUrlObject;
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
    console.log(this.routeObject);

    checkInputFields(data, this.routeObject.inputFields);

    try {
      const response = await requester({
        data: data,
        ...this.getApiUrlAndMethod(this.baseUrlObject, this.routeObject),
        token,
      });

      checkOutputFields(response.data, this.routeObject.outputFields);

      return response;
    } catch (error) {
      console.log(
        `Api:${this.getApiUrl(
          this.baseUrlObject,
          this.routeObject
        )} Api catch, error:`,
        error
      );

      throw error;
    }
  }
}
const apiBuilder = {
  create: () => new ApiBuilder(),
};

export { apiBuilder, ApiBuilder };
