import { objectUtilities } from "utility-store/src/classes/ObjectUtilities";
import { ioFieldsChecker } from "utility-store/src/functions/ioFieldsChecker";

import { appConfigs } from "classes/AppConfigs";
import { appOptions } from "classes/AppOptions";
import { commonTasks } from "classes/CommonTasks";

import { userPropsUtilities } from "classes/UserPropsUtilities";

import { utilities } from "utilities";

import { variables } from "variables";

class ApiHandler {
  constructor({
    // requestDefaultData,
    requestInterceptorsArray,
    requestTransformer,
    responseInterceptorsArray,
    responseTransformer,
    routeObject,
  }) {
    this.requestTransformer = requestTransformer;
    this.#requestInterceptorsArray = requestInterceptorsArray;
    this.responseTransformer = responseTransformer;
    this.#responseInterceptorsArray = responseInterceptorsArray;
    this.data = {};
    this.response = {
      data: this.getData(),
    };
    this.#routeObject = objectUtilities.freezeObject(routeObject);
    this.requesterOptions = {
      ...this.#getApiUrlAndMethod(),
      data: this.getData(),
      headers: {},
      token: "",
    };
  }

  requestTransformerExecutor() {
    this.requestTransformer(this.getData());
    return this;
  }
  responseTransformerExecutor() {
    const transformedData = this.responseTransformer(this.getData());
    this.setData(transformedData);
    return this;
  }
  #requestInterceptorsArray = [];
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

  #ioDataFieldsCheck(ioData, inputFields) {
    const ioDataFieldsCheckResult = ioFieldsChecker(ioData, inputFields, {
      missingFieldsError: variables.notification.error.INPUT_FIELDS_MISSING,
      overloadFieldsError: variables.notification.error.INPUT_FIELDS_OVERLOAD,
      ioDataFieldTypeWrongError:
        variables.notification.error.INPUT_FILED_TYPE_WRONG,
      requiredFieldsNotDefinedError:
        variables.notification.error.REQUIRED_FIELDS_NOT_DEFINED,
      requiredFieldTypeWrongError:
        variables.notification.error.REQUIRED_FIELD_TYPE_WRONG,
    });

    utilities.errorThrower(!ioDataFieldsCheckResult.ok, {
      ...ioDataFieldsCheckResult.errorObject,
      inputFields,
      ioData,
    });
  }
  inputDataFieldsCheck(inputData = this.getData()) {
    const { apiConfigs } = appConfigs.getConfigs();

    commonTasks.checkAndExecute(apiConfigs.inputDataFieldsCheck, () => {
      this.#ioDataFieldsCheck(inputData, this.#routeObject.inputFields);
    });

    return this;
  }
  outputDataFieldsCheck(outputData = this.getData()) {
    const {
      apiConfigs: { outputDataPropertiesCheck },
    } = appConfigs.getConfigs();

    commonTasks.checkAndExecute(outputDataPropertiesCheck, () => {
      this.#ioDataFieldsCheck(outputData, this.#routeObject.outputFields[0]);
    });

    return this;
  }

  responseErrorsHandler(response = this.getResponse()) {
    const {
      data: { errors },
      status,
      statusCode,
    } = response;

    const responseCode = statusCode || status;

    if (responseCode >= 400) {
      if (responseCode === 401) commonTasks.resetEverything();

      commonTasks.correctErrorsAndPrint(errors);

      throw errors;
    }

    return this;
  }

  #mergeRequesterOptions(extraOptions = {}) {
    const { apiDefaultOptions } = appOptions.getOptions();
    const mergedOptions = {
      ...apiDefaultOptions,
      ...this.requesterOptions,
      ...extraOptions,
      data: undefined,
      headers: {
        ...apiDefaultOptions.headers,
        ...(extraOptions.headers || {}),
      },
      token: extraOptions.token || userPropsUtilities.getMainTokenFromStorage(),
    };

    if (mergedOptions.token) {
      mergedOptions.headers.Authorization = `Bearer ${mergedOptions.token}`;
    }

    const data = this.getData();
    if (objectUtilities.objectKeysLength(data)) {
      mergedOptions.data = data;
    }

    this.requesterOptions = mergedOptions;
    return this;
  }

  #executeInterceptors(interceptors, data) {
    let dataEnhancedWithInterceptors = data;

    interceptors.forEach((interceptor) => {
      dataEnhancedWithInterceptors = interceptor(dataEnhancedWithInterceptors);
    });

    return dataEnhancedWithInterceptors;
  }
  executeRequestInterceptors(requestData = this.getData()) {
    const newData = this.#executeInterceptors(
      this.#requestInterceptorsArray,
      requestData
    );
    this.setData(newData);
    return this;
  }
  executeResponseInterceptors(response = this.getResponse()) {
    const mutatedResponse = this.#executeInterceptors(
      this.#responseInterceptorsArray,
      response
    );
    this.setResponse(mutatedResponse);
    return this;
  }

  getData() {
    return this.data;
  }
  setData(data) {
    this.data = data;
    return this;
  }
  setResponse(response) {
    this.response = response;
    return this;
  }
  getResponse() {
    return this.response;
  }

  async sendRequest(options = this.requesterOptions) {
    const response = await utilities.requester(options);
    this.setResponse(response).setData(response.data);
    return this;
  }

  async sendFullFeaturedRequest(
    requestData = {},
    extraOptions = this.requesterOptions
  ) {
    try {
      (
        await this.setData(requestData)
          .requestTransformerExecutor()
          .executeRequestInterceptors()
          .inputDataFieldsCheck()
          .#mergeRequesterOptions(extraOptions)
          .sendRequest()
      )
        .responseErrorsHandler()
        .outputDataFieldsCheck()
        .responseTransformerExecutor()
        .executeResponseInterceptors()
        .#logSuccessfulResponse();

      return this.getResponse();
    } catch (error) {
      this.#logFailureResponse(error);
      commonTasks.throwConnAbortNotification();
      throw error;
    }
  }

  #logSuccessfulResponse(response = this.getResponse()) {
    const {
      apiConfigs: { logSuccessfulResponse },
    } = appConfigs.getConfigs();

    commonTasks.checkAndExecute(logSuccessfulResponse, () =>
      logger.debug("response:", response)
    );
  }
  #logFailureResponse(error) {
    const {
      apiConfigs: { logFailureResponse },
    } = appConfigs.getConfigs();

    commonTasks.checkAndExecute(logFailureResponse, () =>
      logger.error(`Api:${this.#routeObject.fullUrl} Api catch, error:`, error)
    );
  }
}

const apiHandler = {
  create: (requirements) => new ApiHandler(requirements),
};

export { apiHandler, ApiHandler };
