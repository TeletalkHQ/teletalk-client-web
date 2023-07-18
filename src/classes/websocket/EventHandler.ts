import { checkFields } from "check-fields";
import { trier } from "simple-trier";

import { appConfigs } from "~/classes/AppConfigs";
import { websocket } from "~/classes/websocket/Websocket";
import type {
  IO,
  Interceptors,
  NativeError,
  RequestTransformer,
  ResponseCallback,
  ResponseTransformer,
  SocketErrorCallback,
  SocketResponse,
  SocketRoute,
} from "~/types";
import { AutoBind } from "~/types/utils";
import { utils } from "~/utils";
import { variables } from "~/variables";

import { notificationStore } from "../NotificationStore";

interface Options {
  timeout: number;
}

export class EventHandler {
  private requestData: IO["input"];
  private defaultOptions: Options = { timeout: 0 };
  private requestInterceptors: Interceptors = [];
  private requestTransformer: RequestTransformer<IO["input"]> = (requestData) =>
    requestData;
  private response: SocketResponse;
  private responseCallback: ResponseCallback;
  private errorCallback: SocketErrorCallback;
  private responseInterceptors: Interceptors = [];
  private responseTransformer: ResponseTransformer = (response) => response;
  private route: SocketRoute;

  getRequestData() {
    return this.requestData;
  }
  setRequestData(requestData: IO["input"]) {
    this.requestData = requestData;
    return this;
  }

  setRoute(route: SocketRoute) {
    this.route = route;
    return this;
  }

  getResponse() {
    return this.response;
  }
  setResponse(response: SocketResponse) {
    this.response = response;
    return this;
  }

  getResponseData() {
    return this.getResponse().data;
  }
  setResponseData(responseData: IO["output"]) {
    this.response.data = responseData;
    return this;
  }

  async emit(
    data: IO["output"] = {},
    options: Partial<Options> = this.defaultOptions
  ) {
    const mergedOptions = { ...this.defaultOptions, ...options };

    const response: SocketResponse = await new Promise((resolve, reject) => {
      this.getClient().emit(
        this.route.name,
        data,
        (response: SocketResponse) => {
          setTimeout(() => {
            if (response.ok) resolve(response);

            reject(response);
          }, mergedOptions.timeout);
        }
      );
    });

    this.setResponse(response).setResponseData(response.data);

    return this;
  }

  getClient() {
    return websocket.client;
  }

  async emitFull<T extends IO>(
    data: T["input"],
    responseCallback: ResponseCallback<T["output"]> = async (response) =>
      response.data,
    errorCallback: SocketErrorCallback = (_errors) => {},
    options?: Partial<Options>
  ): Promise<T["output"]> {
    this.requestData = data;
    this.responseCallback = responseCallback;
    this.errorCallback = errorCallback;

    return await trier<T["output"]>(this.emitFull.name)
      .async()
      .try(this.tryToEmitFull, options)
      .catch(this.catchEmitFull)
      .run();
  }

  @AutoBind
  private async tryToEmitFull(options?: Options) {
    await this
      // .executeRequestTransformer()
      // .executeRequestInterceptors()
      // .inputDataFieldsCheck()
      .emit(this.requestData, options);

    await this.outputDataFieldsCheck()
      // .executeResponseTransformer()
      // .executeResponseInterceptors()
      .logSuccessfulResponse()
      .executeResponseCallback();

    return this.getResponse();
  }

  @AutoBind
  private catchEmitFull(response: SocketResponse) {
    this.errorCallback(response.errors);

    utils.printResponseErrors(response.errors);

    this.logFailureResponse(Object.values(response.errors || [])[0]);
  }

  private executeRequestTransformer() {
    this.requestData = this.requestTransformer(this.getRequestData());
    return this;
  }

  private executeRequestInterceptors(requestData = this.getRequestData()) {
    const newData = this.executeInterceptors(
      this.requestInterceptors,
      requestData
    );
    this.setRequestData(newData);
    return this;
  }

  private inputDataFieldsCheck(inputData = this.getRequestData()) {
    if (appConfigs.getConfigs().api.shouldCheckInputDataFields)
      checkFields(
        inputData,
        this.route.inputFields,
        variables.notifications.errors.checkFieldErrors.input
      );

    return this;
  }

  private outputDataFieldsCheck(outputData = this.getResponseData()) {
    if (appConfigs.getConfigs().api.shouldCheckOutputDataFields)
      checkFields(
        outputData,
        this.route.outputFields,
        variables.notifications.errors.checkFieldErrors.output
      );

    return this;
  }

  private executeResponseTransformer() {
    const transformedResponse = this.responseTransformer(this.getResponse());
    this.setResponse(transformedResponse);
    return this;
  }

  private executeResponseInterceptors(response = this.getResponse()) {
    const newData = this.executeInterceptors(
      this.responseInterceptors,
      response
    );
    this.setResponseData(newData);
    return this;
  }

  private logSuccessfulResponse(response = this.getResponse()) {
    if (appConfigs.getConfigs().api.shouldLogSuccessfulResponse)
      console.debug("response:", response);

    return this;
  }

  private logFailureResponse(
    error: NativeError = notificationStore.find("UNKNOWN_ERROR")
  ) {
    if (appConfigs.getConfigs().api.shouldLogFailureResponse)
      console.error(`Api:${this.route.name} Api catch, error:`, error);
  }

  private executeInterceptors(
    interceptors: Interceptors,
    data: IO["input"] | IO["output"]
  ) {
    let newData = data;

    interceptors.forEach((interceptor) => {
      newData = interceptor(newData);
    });

    return newData;
  }

  private async executeResponseCallback() {
    await this.responseCallback(this.response);
    return this;
  }
}

export const eventHandler = () => new EventHandler();
