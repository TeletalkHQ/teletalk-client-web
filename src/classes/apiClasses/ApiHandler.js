import { appConfigs } from "classes/AppConfigs";
import { appOptions } from "classes/AppOptions";
import { commonFunctionalities } from "classes/CommonFunctionalities";
import { commonNotificationManager } from "classes/CommonNotificationManager";
import { notificationManager } from "classes/NotificationManager";
import { objectUtilities } from "classes/ObjectUtilities";
import { userPropsUtilities } from "classes/UserPropsUtilities";

import { ioFieldsChecker } from "functions/helpers/ioFieldsChecker";
import { requester } from "functions/utilities/apiUtilities";

import { notifications } from "variables/others/notifications";

const {
  localErrors: {
    INPUT_FIELDS_MISSING,
    INPUT_FIELDS_OVERLOAD,
    OUTPUT_FIELDS_MISSING,
    OUTPUT_FIELDS_OVERLOAD,
  },
} = notifications;

class ApiHandler {
  constructor(requirements) {
    this.requestDefaultData = requirements.requestDefaultData;
    this.response = {
      data: undefined,
    };
    this.#routeObject = requirements.routeObject;

    this.#responseTransformer = requirements.responseTransformer;
    this.#requestTransformer = requirements.requestTransformer;

    this.#requestInterceptorsArray = requirements.requestInterceptorsArray;
    this.#responseInterceptorsArray = requirements.responseInterceptorsArray;
  }
  #routeObject = {};

  #requestTransformer = (data) => data;
  #responseTransformer = (data) => data;
  #requestInterceptorsArray = [];
  #responseInterceptorsArray = [];

  #getApiUrlAndMethod(route) {
    return {
      url: this.#getApiUrlFromRouteObject(route),
      method: this.#getApiMethodFromRouteObject(route),
    };
  }
  #getApiMethodFromRouteObject(route) {
    return route.method;
  }
  #getApiUrlFromRouteObject(route) {
    return route.fullUrl;
  }
  #ioDataFieldsCheck(
    ioData,
    actualFields,
    missingFieldsError,
    overloadFieldsError
  ) {
    const ioDataFieldsCheckResult = ioFieldsChecker(ioData, actualFields, {
      missingFieldsError,
      overloadFieldsError,
    });

    if (!ioDataFieldsCheckResult.done) {
      console.log(ioData, actualFields);
      const newErrorObject = {
        ...ioDataFieldsCheckResult.errorObject,
        actualFields,
        ioData,
      };
      throw newErrorObject;
    }
  }
  #inputDataFieldsCheck(inputData) {
    const { inputDataPropertiesCheck } = appConfigs.configs.apiConfigs;

    appConfigs.checkAndExecute(inputDataPropertiesCheck, () => {
      this.#ioDataFieldsCheck(
        inputData,
        this.#routeObject.inputFields,
        INPUT_FIELDS_MISSING,
        INPUT_FIELDS_OVERLOAD
      );
    });
  }
  #outputDataFieldsCheck(outputData) {
    const { outputDataPropertiesCheck } = appConfigs.configs.apiConfigs;

    appConfigs.checkAndExecute(outputDataPropertiesCheck, () => {
      this.#ioDataFieldsCheck(
        outputData,
        this.#routeObject.outputFields,
        OUTPUT_FIELDS_MISSING,
        OUTPUT_FIELDS_OVERLOAD
      );
    });
  }

  #responseErrorsHandler(response) {
    const statusCode = response.statusCode || response.status;
    if (statusCode === 401) commonFunctionalities.resetEverything();
    else if (statusCode >= 400) {
      const correctedErrors = this.#correctResponseErrors(response.data.errors);

      this.#responseErrorsSubmitter(correctedErrors);
      throw correctedErrors;
    }
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
        ...this.#getApiUrlAndMethod(this.#routeObject),
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

      commonNotificationManager.submitAbortedConnectionNotification(error);

      throw error;
    }
  }

  #logSuccessfulResponse(response) {
    const { logSuccessfulResponse } = appConfigs.configs.apiConfigs;

    appConfigs.checkAndExecute(logSuccessfulResponse, () =>
      console.log(response)
    );
  }
  #logFailureResponse(error) {
    const { logFailureResponse } = appConfigs.configs.apiConfigs;

    appConfigs.checkAndExecute(logFailureResponse, () =>
      console.log(`Api:${this.#routeObject.fullUrl} Api catch, error:`, error)
    );
  }

  #mergeRequesterOptions(options) {
    const defaultOptions = appOptions.options.apiDefaultOptions;
    const mergedOptions = {
      ...defaultOptions,
      ...options,
      headers: { ...defaultOptions.headers, ...options?.headers },
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

  #executeRequestInterceptors(request) {
    return this.#executeInterceptors(this.#requestInterceptorsArray, request);
  }
  #executeResponseInterceptors(response) {
    return this.#executeInterceptors(this.#responseInterceptorsArray, response);
  }
  #executeInterceptors(interceptors, data) {
    let dataEnhancedWithInterceptors = data;

    interceptors.forEach((interceptor) => {
      dataEnhancedWithInterceptors = interceptor(dataEnhancedWithInterceptors);
    });

    return dataEnhancedWithInterceptors;
  }

  #responseErrorsSubmitter(errors) {
    errors.forEach((errorItem) => {
      notificationManager.submitErrorNotification(errorItem);
    });
  }

  #correctResponseErrors(responseErrors) {
    const arrayOfErrors = objectUtilities.objectValues(responseErrors);

    const correctedErrors = arrayOfErrors.map((errorItem) => {
      const { errorCode, reason, ...restOfErrorItemProps } = errorItem;

      const finalErrorItem = restOfErrorItemProps;
      finalErrorItem.notificationCode = errorCode;
      finalErrorItem.notificationReason = reason;

      return finalErrorItem;
    });

    return correctedErrors;
  }
}

const apiHandler = {
  create: (requirements) => new ApiHandler(requirements),
};

export { apiHandler, ApiHandler };
