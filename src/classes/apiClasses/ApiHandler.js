import { appConfigs } from "classes/AppConfigs";
import { appOptions } from "classes/AppOptions";
import { commonFunctionalities } from "classes/CommonFunctionalities";
import { objectUtilities } from "classes/ObjectUtilities";
import { userPropsUtilities } from "classes/UserPropsUtilities";

import { ioFieldsChecker } from "functions/helpers/ioFieldsChecker";
import { requester } from "functions/utilities/apiUtilities";
import { errorThrower } from "functions/utilities/otherUtilities";

import { notifications } from "variables/otherVariables/notifications";

const {
  localErrors: {
    INPUT_FIELDS_MISSING,
    INPUT_FIELDS_OVERLOAD,
    OUTPUT_FIELDS_MISSING,
    OUTPUT_FIELDS_OVERLOAD,
  },
} = notifications;

class ApiHandler {
  constructor({
    requestDefaultData,
    requestInterceptorsArray,
    requestTransformer,
    responseInterceptorsArray,
    responseTransformer,
    routeObject,
  }) {
    this.requestDefaultData = requestDefaultData;
    this.#requestTransformer = requestTransformer;
    this.#requestInterceptorsArray = requestInterceptorsArray;
    this.#responseTransformer = responseTransformer;
    this.#responseInterceptorsArray = responseInterceptorsArray;
    this.response = {
      data: undefined,
    };
    this.#routeObject = objectUtilities.freezeObject(routeObject);
  }

  #requestTransformer = (data) => data;
  #requestInterceptorsArray = [];
  #responseTransformer = (data) => data;
  #responseInterceptorsArray = [];
  #routeObject = {};

  #getApiUrlAndMethod() {
    return {
      url: this.#getApiUrlFromRouteObject(),
      method: this.#getApiMethodFromRouteObject(),
    };
  }
  #getApiMethodFromRouteObject() {
    return this.#routeObject.method;
  }
  #getApiUrlFromRouteObject() {
    return this.#routeObject.fullUrl;
  }

  #ioDataFieldsCheck(
    ioData,
    requiredFields,
    missingFieldsError,
    overloadFieldsError
  ) {
    const ioDataFieldsCheckResult = ioFieldsChecker(ioData, requiredFields, {
      missingFieldsError,
      overloadFieldsError,
    });

    errorThrower(!ioDataFieldsCheckResult.done, {
      ...ioDataFieldsCheckResult.errorObject,
      requiredFields,
      ioData,
    });
  }
  #inputDataFieldsCheck(inputData) {
    const {
      apiConfigs: { inputDataPropertiesCheck },
    } = appConfigs.getConfigs();

    commonFunctionalities.checkAndExecute(inputDataPropertiesCheck, () => {
      this.#ioDataFieldsCheck(
        inputData,
        this.#routeObject.inputFields,
        INPUT_FIELDS_MISSING,
        INPUT_FIELDS_OVERLOAD
      );
    });
  }
  #outputDataFieldsCheck(outputData) {
    const {
      apiConfigs: { outputDataPropertiesCheck },
    } = appConfigs.getConfigs();

    commonFunctionalities.checkAndExecute(outputDataPropertiesCheck, () => {
      this.#ioDataFieldsCheck(
        outputData,
        this.#routeObject.outputFields,
        OUTPUT_FIELDS_MISSING,
        OUTPUT_FIELDS_OVERLOAD
      );
    });
  }

  #responseErrorsHandler(response) {
    const {
      data: { errors },
      status,
      statusCode,
    } = response;

    const responseCode = statusCode || status;

    if (responseCode >= 400) {
      if (responseCode === 401) commonFunctionalities.resetEverything();

      commonFunctionalities.correctErrorsAndPrint(errors);

      throw errors;
    }
  }

  #mergeRequesterOptions(options) {
    const { apiDefaultOptions } = appOptions.getOptions();
    const mergedOptions = {
      ...apiDefaultOptions,
      ...options,
      headers: { ...apiDefaultOptions.headers, ...options?.headers },
      token: options.token || userPropsUtilities.getMainTokenFromStorage(),
    };

    if (mergedOptions.token) {
      mergedOptions.headers.Authorization = `Bearer ${mergedOptions.token}`;
    }

    if (!objectUtilities.objectKeysLength(options.data)) {
      delete mergedOptions.data;
    }

    return mergedOptions;
  }

  #executeInterceptors(interceptors, data) {
    let dataEnhancedWithInterceptors = data;

    interceptors.forEach((interceptor) => {
      dataEnhancedWithInterceptors = interceptor(dataEnhancedWithInterceptors);
    });

    return dataEnhancedWithInterceptors;
  }
  #executeRequestInterceptors(requestData) {
    return this.#executeInterceptors(
      this.#requestInterceptorsArray,
      requestData
    );
  }
  #executeResponseInterceptors(response) {
    return this.#executeInterceptors(this.#responseInterceptorsArray, response);
  }

  async sendRequest(requestData = {}, extraOptions = {}) {
    try {
      const transformedRequestData = this.#requestTransformer(requestData);

      const requestDataFromInterceptors = this.#executeRequestInterceptors(
        transformedRequestData
      );

      this.#inputDataFieldsCheck(requestDataFromInterceptors);

      const mergedRequesterOptions = this.#mergeRequesterOptions({
        data: requestDataFromInterceptors,
        ...this.#getApiUrlAndMethod(),
        ...extraOptions,
      });

      this.response = await requester(mergedRequesterOptions);

      this.#responseErrorsHandler(this.response);
      this.#outputDataFieldsCheck(this.response.data);
      const transformedResponse = this.#responseTransformer(this.response.data);
      this.response.data = transformedResponse;

      const responseFromInterceptors = this.#executeResponseInterceptors(
        this.response
      );

      this.#logSuccessfulResponse(this.response);

      return responseFromInterceptors;
    } catch (error) {
      this.#logFailureResponse(error);

      commonFunctionalities.throwConnAbortNotification();

      throw error;
    }
  }

  #logSuccessfulResponse(response) {
    const {
      apiConfigs: { logSuccessfulResponse },
    } = appConfigs.getConfigs();

    commonFunctionalities.checkAndExecute(logSuccessfulResponse, () =>
      console.log(response)
    );
  }
  #logFailureResponse(error) {
    const {
      apiConfigs: { logFailureResponse },
    } = appConfigs.getConfigs();

    commonFunctionalities.checkAndExecute(logFailureResponse, () =>
      logger.error(`Api:${this.#routeObject.fullUrl} Api catch, error:`, error)
    );
  }
}

const apiHandler = {
  create: (requirements) => new ApiHandler(requirements),
};

export { apiHandler, ApiHandler };
