import { stuffStore } from "classes/StuffStore";
import { userPropsUtilities } from "classes/UserPropsUtilities";
import { appOptions } from "classes/AppOptions";

import { requester } from "functions/utilities/requester";
import { ioFieldsChecker } from "functions/helpers/ioFieldsChecker";
import { evaluateValueLength } from "functions/utilities/utilities";

import { notifications } from "variables/others/notifications";

const {
  INPUT_FIELDS_MISSING,
  INPUT_FIELDS_OVERLOAD,
  // OUTPUT_FIELDS_MISSING,
  // OUTPUT_FIELDS_OVERLOAD,
} = stuffStore.errors;

class ApiBuilder {
  constructor() {
    this.routeObject = {};
    this.transformRequest = (data) => data;
    this.transformResponse = (data) => data;
  }

  #responseInterceptorsArray = [];
  #requestInterceptorsArray = [];
  build() {
    if (!this.routeObject.fullUrl) {
      const error = notifications.localErrors.URL_NOT_FOUND;
      throw error;
    }

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

  async sendRequest({ token, ...requestData } = {}) {
    try {
      const requestDataTransformed = this.transformRequest(requestData);

      const requestDataFromInterceptors = this.executeRequestInterceptors(
        requestDataTransformed
      );

      const requestFieldsCheckResult = ioFieldsChecker(
        requestDataFromInterceptors,
        this.routeObject.inputFields,
        {
          missingFieldsError: INPUT_FIELDS_MISSING,
          overloadFieldsError: INPUT_FIELDS_OVERLOAD,
        }
      );
      if (!requestFieldsCheckResult.done)
        throw requestFieldsCheckResult.errorObject;

      const mergedRequesterOptions = this.mergeRequesterOptions({
        data: requestDataFromInterceptors,
        ...this.getApiUrlAndMethod(this.routeObject),
        token,
      });
      const response = await requester(mergedRequesterOptions);

      // const responseFieldsCheckResult = ioFieldsChecker(
      //   response.data,
      //   this.routeObject.outputFields,
      //   {
      //     missingFieldsError: OUTPUT_FIELDS_MISSING,
      //     overloadFieldsError: OUTPUT_FIELDS_OVERLOAD,
      //   }
      // );
      // if (!responseFieldsCheckResult.done)
      //   throw responseFieldsCheckResult.errorObject;

      const responseTransformed = this.transformResponse(response.data);
      response.data = responseTransformed;

      const responseFromInterceptors =
        this.executeResponseInterceptors(response);

      return responseFromInterceptors;
    } catch (error) {
      console.log(`Api:${this.routeObject.fullUrl} Api catch, error:`, error);

      throw error;
    }
  }

  mergeRequesterOptions(options) {
    const defaultOptions = appOptions.options.requesterOptions;
    const mergedOptions = {
      ...defaultOptions,
      ...options,
      data: { ...defaultOptions.data, ...options.data },
      headers: { ...defaultOptions.headers, ...options?.headers },
      token: options.token || userPropsUtilities.getMainTokenFromStorage(),
    };

    if (mergedOptions.token) {
      mergedOptions.headers.Authorization = `Bearer ${mergedOptions.token}`;
    }

    if (!evaluateValueLength(options.data)) {
      delete mergedOptions.data;
    }

    return mergedOptions;
  }

  executeRequestInterceptors(request) {
    return this.executeInterceptors(this.#requestInterceptorsArray, request);
  }
  executeResponseInterceptors(response) {
    return this.executeInterceptors(this.#responseInterceptorsArray, response);
  }
  executeInterceptors(interceptors, response) {
    let responseEnhancedWithInterceptors = response;

    interceptors.forEach((interceptor) => {
      responseEnhancedWithInterceptors = interceptor(
        responseEnhancedWithInterceptors
      );
    });

    return responseEnhancedWithInterceptors;
  }
  requestInterceptors(...callbacks) {
    this.#requestInterceptorsArray = callbacks;
    return this;
  }
  responseInterceptors(...callbacks) {
    this.#responseInterceptorsArray = callbacks;
    return this;
  }

  requestTransformer(callback = this.transformRequest) {
    this.transformRequest = callback;
    return this;
  }
  responseTransformer(callback = this.transformResponse) {
    this.transformResponse = callback;
    return this;
  }
}
const apiBuilder = {
  create: () => new ApiBuilder(),
};

export { apiBuilder, ApiBuilder };
