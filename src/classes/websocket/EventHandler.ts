import { checkFields } from "check-fields";
import { trier } from "simple-trier";

import { appConfigs } from "~/classes/AppConfigs";
import { commonTasks } from "~/classes/CommonTasks";
import { websocket } from "~/classes/websocket/Websocket";
import type {
  Interceptors,
  NativeError,
  RequestData,
  RequestTransformer,
  ResponseCallback,
  ResponseData,
  ResponseTransformer,
  SocketResponse,
  SocketRoute,
} from "~/types";
import { AutoBind } from "~/types/utils";
import { checkFieldErrors } from "~/variables/notification/error";

class EventHandler {
  requestData: RequestData = {};
  requestInterceptors: Interceptors = [];
  requestTransformer: RequestTransformer = (requestData: RequestData) =>
    requestData;
  response: SocketResponse;
  responseCallback: ResponseCallback;
  responseInterceptors: Interceptors = [];
  responseTransformer: ResponseTransformer = (response) => response;
  route: SocketRoute;

  getRequestData() {
    return this.requestData;
  }
  setRequestData(requestData: RequestData) {
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
  setResponseData(responseData: ResponseData) {
    this.response.data = responseData;
    return this;
  }

  async emit(data: ResponseData = {}) {
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

    this.setResponse(response).setResponseData(response.data);

    return this;
  }

  async emitFull(
    data: RequestData = {},
    responseCallback: ResponseCallback = async () => {}
  ) {
    this.requestData = data;
    this.responseCallback = responseCallback;

    return await trier(this.emitFull.name)
      .async()
      .try(this.tryToEmitFull)
      .catch(this.catchEmitFull)
      .run();
  }

  @AutoBind
  async tryToEmitFull() {
    await this.executeRequestTransformer()
      .executeRequestInterceptors()
      .inputDataFieldsCheck()
      .emit(this.requestData);

    await this.outputDataFieldsCheck()
      .executeResponseTransformer()
      .executeResponseInterceptors()
      .logSuccessfulResponse()
      .executeResponseCallback();

    return this.getResponse();
  }

  @AutoBind
  private catchEmitFull(response: SocketResponse) {
    commonTasks.correctErrorsAndPrint(response.errors);
    this.logFailureResponse(Object.values(response.errors!)[0]);
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
      checkFields(inputData, this.route.inputFields, checkFieldErrors.input);

    return this;
  }

  private outputDataFieldsCheck(outputData = this.getResponseData()) {
    if (appConfigs.getConfigs().api.shouldCheckOutputDataFields)
      checkFields(outputData, this.route.outputFields, checkFieldErrors.output);

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

  private logFailureResponse(error: NativeError) {
    if (appConfigs.getConfigs().api.shouldLogFailureResponse)
      console.error(`Api:${this.route.name} Api catch, error:`, error);
  }

  private executeInterceptors(interceptors: Interceptors, data: RequestData) {
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

const eventHandler = {
  create: () => new EventHandler(),
};

export { eventHandler, EventHandler };
