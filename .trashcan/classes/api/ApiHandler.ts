import { trier } from "simple-trier";
import { errorThrower, ioFieldsChecker } from "utility-store";

import { appConfigs } from "~/classes/AppConfigs";
import { commonTasks } from "~/classes/CommonTasks";
import { utilities } from "~/utilities";
import { variables } from "~/variables";

class ApiHandler {
  #requestInterceptors = [];
  #responseInterceptors = [];
  #route = {};
  #apiDefaultOptions = {
    headers: {
      Authorization: "",
    },
    method: "GET",
    url: "",
  };

  constructor({
    requestInterceptors = [],
    requestTransformer = () => {},
    responseInterceptors = [],
    responseTransformer = () => {},
    route = {},
  }) {
    this.requestTransformer = requestTransformer;
    this.#requestInterceptors = requestInterceptors;
    this.responseTransformer = responseTransformer;
    this.#responseInterceptors = responseInterceptors;
    this.data = {};
    this.response = {
      data: this.getData(),
    };
    this.#route = Object.freeze(route);
    this.requesterOptions = {
      ...this.#getApiUrlAndMethod(),
      data: this.getData(),
      headers: {},
    };
  }
  #getApiUrlAndMethod() {
    return {
      url: this.#getApiUrlFromRouteObject(),
      method: this.#getApiMethodFromRouteObject(),
    };
  }
  #getApiMethodFromRouteObject() {
    return this.#route.method;
  }
  #getApiUrlFromRouteObject() {
    return this.#route.fullUrl;
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
      this.#requestInterceptors,
      requestData
    );
    this.setData(newData);
    return this;
  }
  #inputDataFieldsCheck(inputData = this.getData()) {
    const { apiConfigs } = appConfigs.getConfigs();

    commonTasks.checkAndExecute(apiConfigs.shouldCheckInputDataFields, () => {
      this.#ioDataFieldsCheck(
        inputData,
        this.#route.inputFields,
        variables.notification.errors.IO.INPUT
      );
    });

    return this;
  }
  #mergeRequesterOptions(extraOptions = {}) {
    const mergedOptions = {
      ...this.#apiDefaultOptions,
      ...this.requesterOptions,
      ...extraOptions,
      headers: {
        ...this.#apiDefaultOptions.headers,
        ...(extraOptions.headers || {}),
      },
    };

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
      apiConfigs: { shouldCheckOutputDataFields: outputDataPropertiesCheck },
    } = appConfigs.getConfigs();

    commonTasks.checkAndExecute(outputDataPropertiesCheck, () => {
      this.#ioDataFieldsCheck(
        outputData,
        this.#route.outputFields[0],
        variables.notification.errors.IO.OUTPUT
      );
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
      this.#responseInterceptors,
      response
    );
    this.setResponse(mutatedResponse);
    return this;
  }
  #logSuccessfulResponse(response = this.getResponse()) {
    const {
      apiConfigs: { shouldLogSuccessfulResponse: logSuccessfulResponse },
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
      apiConfigs: { shouldLogFailureResponse: logFailureResponse },
    } = appConfigs.getConfigs();

    commonTasks.checkAndExecute(logFailureResponse, () =>
      logger.error(`Api:${this.#route.fullUrl} Api catch, error:`, error)
    );
  }

  #ioDataFieldsCheck(ioData, inputFields, ioErrors) {
    const ioDataFieldsCheckResult = ioFieldsChecker(
      ioData,
      inputFields,
      ioErrors
    );

    errorThrower(!ioDataFieldsCheckResult.ok, {
      ...ioDataFieldsCheckResult.error,
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
