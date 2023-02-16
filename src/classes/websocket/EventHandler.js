import { ioFieldsChecker } from "utility-store/src/utilities/ioFieldsChecker";
import { trier } from "utility-store/src/classes/Trier";

import { appConfigs } from "src/classes/AppConfigs";
import { commonTasks } from "src/classes/CommonTasks";
import { websocket } from "src/classes/websocket/Websocket";

import { utilities } from "src/utilities";

import { variables } from "src/variables";

class EventHandler {
  constructor({
    requestInterceptors = [],
    requestTransformer = () => {},
    responseInterceptors = [],
    responseTransformer = () => {},
    route = {},
  }) {
    this.requestTransformer = requestTransformer;
    this.requestInterceptors = requestInterceptors;
    this.responseTransformer = responseTransformer;
    this.responseInterceptors = responseInterceptors;
    this.requestData = {};
    this.requestArgs = [];
    this.response = {
      data: {},
    };
    this.route = Object.freeze(route);
  }

  getRequestData() {
    return this.requestData;
  }
  setRequestData(requestData) {
    this.requestData = requestData;
    return this;
  }
  getRequestArgs() {
    return this.requestArgs;
  }
  setRequestArgs(...args) {
    this.requestArgs = args;
    return this;
  }

  getResponse() {
    return this.response;
  }
  setResponse(response) {
    this.response = response;
    return this;
  }
  getResponseData() {
    return this.getResponse().data;
  }
  setResponseData(responseData) {
    this.response.data = responseData;
    return this;
  }

  async emit(data = {}, callback = () => {}, ...rest) {
    const promise = new Promise((resolve, _reject) => {
      websocket.client.emit(
        this.route.name,
        data,
        (...args) => {
          resolve(...args);
          callback(...args);
        },
        ...rest
      );
    });

    const response = await promise;
    this.setResponse(response).setResponseData(response.data);

    return this;
  }

  async emitFull(data, callback, ...rest) {
    this.setRequestArgs(data, callback, ...rest);

    return await trier(this.emitFull.name)
      .tryAsync(this.#tryToEmitFull.bind(this))
      .catch(this.#catchEmitFull.bind(this))
      .runAsync();
  }
  async #tryToEmitFull() {
    return (
      await this.#requestTransformerExecutor()
        .#executeRequestInterceptors()
        .#inputDataFieldsCheck()
        .emit(...this.getRequestArgs())
    )
      .#responseErrorsHandler()
      .#outputDataFieldsCheck()
      .#responseTransformerExecutor()
      .#executeResponseInterceptors()
      .#logSuccessfulResponse()
      .getResponse();
  }
  #catchEmitFull(error) {
    this.logFailureResponse(error);
    commonTasks.checkConnAbortNotification();
    throw error;
  }

  #requestTransformerExecutor() {
    this.requestTransformer(this.getRequestData());
    return this;
  }
  #executeRequestInterceptors(requestData = this.getRequestData()) {
    const newData = this.#executeInterceptors(
      this.requestInterceptors,
      requestData
    );
    this.setRequestData(newData);
    return this;
  }
  #inputDataFieldsCheck(inputData = this.getRequestData()) {
    const { apiConfigs } = appConfigs.getConfigs();

    commonTasks.checkAndExecute(apiConfigs.inputDataFieldsCheck, () => {
      this.#ioDataFieldsCheck(
        inputData,
        this.route.inputFields,
        variables.notification.error.IO.INPUT
      );
    });

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
  #outputDataFieldsCheck(outputData = this.getResponseData()) {
    const {
      apiConfigs: { outputDataPropertiesCheck },
    } = appConfigs.getConfigs();

    commonTasks.checkAndExecute(outputDataPropertiesCheck, () => {
      this.#ioDataFieldsCheck(
        outputData,
        this.route.outputFields[0],
        variables.notification.error.IO.OUTPUT
      );
    });

    return this;
  }
  #responseTransformerExecutor() {
    const transformedData = this.responseTransformer(this.getResponseData());
    this.setResponseData(transformedData);
    return this;
  }
  #executeResponseInterceptors(response = this.getResponse()) {
    const newResponse = this.#executeInterceptors(
      this.responseInterceptors,
      response
    );
    this.setResponse(newResponse);
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

  logFailureResponse(error) {
    const {
      apiConfigs: { logFailureResponse },
    } = appConfigs.getConfigs();

    commonTasks.checkAndExecute(logFailureResponse, () =>
      logger.error(`Api:${this.route.fullUrl} Api catch, error:`, error)
    );
  }

  #ioDataFieldsCheck(ioData, inputFields, ioErrors) {
    const ioDataFieldsCheckResult = ioFieldsChecker(
      ioData,
      inputFields,
      ioErrors
    );

    utilities.errorThrower(!ioDataFieldsCheckResult.ok, {
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

const eventHandler = {
  create: (requirements) => new EventHandler(requirements),
};

export { eventHandler, EventHandler };
