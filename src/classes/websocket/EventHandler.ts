import Timeout from "await-timeout";
import { checkFields } from "check-fields";
import { trier } from "simple-trier";

import { appConfigs } from "~/classes/AppConfigs";
import { notificationStore } from "~/classes/NotificationStore";
import { websocket } from "~/classes/websocket/Websocket";
import { UpdateLoadingFn } from "~/hooks/useLoading";
import type {
  IO,
  NativeError,
  ResponseCallback,
  SocketErrorCallback,
  SocketResponse,
  SocketRoute,
} from "~/types";
import { AutoBind } from "~/types/utils";
import { utils } from "~/utils";
import { variables } from "~/variables";

interface Options {
  timeout: number;
}

export class EventHandler<IOType extends IO> {
  private defaultOptions: Options = {
    timeout: appConfigs.getConfigs().api.defaultTimeout,
  };

  private errorCallback: SocketErrorCallback;
  private requestData: IOType["input"];
  private response: SocketResponse;
  private responseCallback: ResponseCallback;
  private route: SocketRoute;

  constructor(private loadingUpdater: UpdateLoadingFn) {}

  getRequestData() {
    return this.requestData;
  }
  setRequestData(requestData: IOType["input"]) {
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
  setResponseData(responseData: IOType["output"]) {
    this.response.data = responseData;
    return this;
  }

  async emit(
    data: IOType["input"] = {},
    options: Partial<Options> = this.defaultOptions
  ) {
    const mergedOptions = { ...this.defaultOptions, ...options };

    this.loadingUpdater(true);

    await Timeout.set(mergedOptions.timeout);

    const response: SocketResponse = await new Promise((resolve, reject) => {
      websocket.client.emit(
        this.route.name,
        data,
        (response: SocketResponse) => {
          if (response.ok) resolve(response);

          reject(response);
        }
      );
    });

    this.loadingUpdater(false);

    this.setResponse(response).setResponseData(response.data);

    return this;
  }

  async emitFull(
    data: IOType["input"],
    responseCallback: ResponseCallback<IOType["output"]> = () => undefined,
    errorCallback: SocketErrorCallback = (_errors) => {},
    options?: Partial<Options>
  ): Promise<IOType["output"]> {
    this.requestData = data;
    this.responseCallback = responseCallback;
    this.errorCallback = errorCallback;

    return await trier<IOType["output"]>(this.emitFull.name)
      .async()
      .try(this.tryToEmitFull, options)
      .catch(this.catchEmitFull)
      .run();
  }

  @AutoBind
  private async tryToEmitFull(options?: Options) {
    await this.emit(this.requestData, options);

    await this.outputDataFieldsCheck()
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

  private async executeResponseCallback() {
    await this.responseCallback(this.response);
    return this;
  }
}

export const eventHandler = <IOType extends IO>(
  loadingUpdater: UpdateLoadingFn
) => new EventHandler<IOType>(loadingUpdater);
