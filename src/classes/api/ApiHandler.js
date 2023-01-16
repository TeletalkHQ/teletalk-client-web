import { objectUtilities } from "utility-store/src/classes/ObjectUtilities";
import { ioFieldsChecker } from "utility-store/src/utilities/ioFieldsChecker";

import { appConfigs } from "src/classes/AppConfigs";
import { commonTasks } from "src/classes/CommonTasks";

import { userUtilities } from "src/classes/UserUtilities";

import { utilities } from "src/utilities";

import { variables } from "src/variables";
import { trier } from "utility-store/src/classes/Trier";

class ApiHandler {
  #requestInterceptorsArray = [];
  #responseInterceptorsArray = [];
  #routeObject = {};
  #apiDefaultOptions = {
    method: "GET",
    url: "",
    headers: { Authorization: "" },
  };

  constructor({
    // requestDefaultData,
    requestInterceptorsArray = () => {},
    requestTransformer = () => {},
    responseInterceptorsArray = () => {},
    responseTransformer = () => {},
    routeObject = {},
  }) {
    this.requestTransformer = requestTransformer;
    this.#requestInterceptorsArray = requestInterceptorsArray;
    this.responseTransformer = responseTransformer;
    this.#responseInterceptorsArray = responseInterceptorsArray;
    this.data = {};
    this.response = {
      data: this.getData(),
    };
    this.#routeObject = Object.freeze(routeObject);
    this.requesterOptions = {
      ...this.#getApiUrlAndMethod(),
      data: this.getData(),
      headers: {},
      token: "",
    };
  }
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
    return await trier(this.sendFullFeaturedRequest.name)
      .tryAsync(
        this.#tryToSendFullFeaturedRequest.bind(this),
        requestData,
        extraOptions
      )
      .catch(this.#catchSendFullFeaturedRequest.bind(this))
      .runAsync();
  }
  async #tryToSendFullFeaturedRequest(requestData, extraOptions) {
    return (
      await this.setData(requestData)
        .#requestTransformerExecutor()
        .#executeRequestInterceptors()
        .#inputDataFieldsCheck()
        .#mergeRequesterOptions(extraOptions)
        .sendRequest()
    )
      .#responseErrorsHandler()
      .#outputDataFieldsCheck()
      .#responseTransformerExecutor()
      .#executeResponseInterceptors()
      .#logSuccessfulResponse()
      .getResponse();
  }

  #requestTransformerExecutor() {
    this.requestTransformer(this.getData());
    return this;
  }
  #executeRequestInterceptors(requestData = this.getData()) {
    const newData = this.#executeInterceptors(
      this.#requestInterceptorsArray,
      requestData
    );
    this.setData(newData);
    return this;
  }
  #inputDataFieldsCheck(inputData = this.getData()) {
    const { apiConfigs } = appConfigs.getConfigs();

    commonTasks.checkAndExecute(apiConfigs.inputDataFieldsCheck, () => {
      this.#ioDataFieldsCheck(inputData, this.#routeObject.inputFields);
    });

    return this;
  }
  #mergeRequesterOptions(extraOptions = {}) {
    const mergedOptions = {
      ...this.#apiDefaultOptions,
      ...this.requesterOptions,
      ...extraOptions,
      data: undefined,
      headers: {
        ...this.#apiDefaultOptions.headers,
        ...(extraOptions.headers || {}),
      },
      token: extraOptions.token || userUtilities.getToken(),
    };

    if (mergedOptions.token) {
      mergedOptions.headers.Authorization = `Bearer ${mergedOptions.token}`;
    }

    const data = this.getData();
    if (Object.keys(data)) {
      mergedOptions.data = data;
    }

    this.requesterOptions = mergedOptions;
    return this;
  }
  #responseErrorsHandler(response = this.getResponse()) {
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
  #outputDataFieldsCheck(outputData = this.getData()) {
    const {
      apiConfigs: { outputDataPropertiesCheck },
    } = appConfigs.getConfigs();

    commonTasks.checkAndExecute(outputDataPropertiesCheck, () => {
      this.#ioDataFieldsCheck(outputData, this.#routeObject.outputFields[0]);
    });

    return this;
  }
  #responseTransformerExecutor() {
    const transformedData = this.responseTransformer(this.getData());
    this.setData(transformedData);
    return this;
  }
  #executeResponseInterceptors(response = this.getResponse()) {
    const mutatedResponse = this.#executeInterceptors(
      this.#responseInterceptorsArray,
      response
    );
    this.setResponse(mutatedResponse);
    return this;
  }
  #logSuccessfulResponse(response = this.getResponse()) {
    const {
      apiConfigs: { logSuccessfulResponse },
    } = appConfigs.getConfigs();

    commonTasks.checkAndExecute(logSuccessfulResponse, () =>
      logger.debug("response:", response)
    );

    return this;
  }

  #catchSendFullFeaturedRequest(error) {
    this.logFailureResponse(error);
    commonTasks.checkConnAbortNotification();
    throw error;
  }
  logFailureResponse(error) {
    const {
      apiConfigs: { logFailureResponse },
    } = appConfigs.getConfigs();

    commonTasks.checkAndExecute(logFailureResponse, () =>
      logger.error(`Api:${this.#routeObject.fullUrl} Api catch, error:`, error)
    );
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

  #executeInterceptors(interceptors, data) {
    let dataEnhancedWithInterceptors = data;

    interceptors.forEach((interceptor) => {
      dataEnhancedWithInterceptors = interceptor(dataEnhancedWithInterceptors);
    });

    return dataEnhancedWithInterceptors;
  }
}

const apiHandler = {
  create: (requirements) => new ApiHandler(requirements),
};

export { apiHandler, ApiHandler };
