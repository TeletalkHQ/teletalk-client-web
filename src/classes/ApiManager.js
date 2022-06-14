import { requester } from "~/functions/utils/requester";

class ApiManager {
  constructor() {
    this.baseUrlObject = this.defaultUrlObject();
    this.routeObject = this.defaultModelObject();
  }

  #reset() {
    this.data = this.defaultData();
    this.baseUrlObject = this.defaultUrlObject();
    this.routeObject = this.defaultModelObject();
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
    return `${baseUrl.route}${route.route}`;
  }

  defaultModelObject() {
    return {};
  }
  defaultUrlObject() {
    return {};
  }

  create() {
    this.#reset();
    return this;
  }
  build() {
    return this.sendRequest;
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

  customFn() {}

  async sendRequest({ token, ...data } = {}) {
    try {
      const response = await requester({
        data: data,
        ...this.getApiUrlAndMethod(this.baseUrlObject, this.routeObject),
        token,
      });

      return response;
    } catch (error) {
      logger.log(
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
const apiManager = new ApiManager();

export { apiManager, ApiManager };
