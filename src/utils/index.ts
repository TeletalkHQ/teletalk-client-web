import { appConfigs } from "~/classes/AppConfigs";
import { envManager } from "~/classes/EnvironmentManager";
import { notificationManager } from "~/classes/NotificationManager";
import { stuffStore } from "~/classes/StuffStore";
import { validatorManager } from "~/classes/validator/ValidatorManager";
import { socketEmitterStore } from "~/classes/websocket/SocketEmitterStore";
import { websocket } from "~/classes/websocket/Websocket";
import { ModelName, NativeError, NativeModel } from "~/types";
import { ValidatorName } from "~/types";
import { SelectedCountry } from "~/types";

import { transformers } from "./transformers";

const correctErrorsAndPrint = (errors: NativeError[]) => {
  errors.forEach((item) => {
    notificationManager.submitErrorNotification({
      ...item,
      message: `MESSAGE: ${item.reason}`,
    });
  });
};

const isValueLengthInBetweenMinMax = (modelName: ModelName, value: string) => {
  const { maxLength, minLength } = stuffStore.models[modelName] as NativeModel;

  const inputValueLength = value.length;

  return inputValueLength >= minLength! && inputValueLength <= maxLength!;
};

const isValueLengthEqualToLength = (modelName: ModelName, value: string) => {
  return value.length === (stuffStore.models[modelName] as NativeModel).length;
};

const createInputValidator =
  (validatorName: ValidatorName, onChangeFn: any) => (value: any) => {
    validatorManager.validators[validatorName]
      .inputValidator(value)
      .checkErrors()
      .executeIfNoError(onChangeFn);
  };

const checkErrorCodeIsConnAborted = (errorCode: string) =>
  errorCode === "ECONNABORTED";

const printCatchError = (error: Error, functionName: string) => {
  console.error(`${functionName} catch, error: `);
  console.error(error);
};

const makeNonBreakSpace = (length: number) =>
  Array.from({ length }).map((_) => "&nbsp;");

const isIos = () => {
  return (
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)
  );
};

const isCountrySelected = (c: SelectedCountry) => {
  return !!(c?.countryCode && c?.countryName && c?.countryShortName);
};

const registerWindowCustomProperties = () => {
  //@ts-ignore
  window.appConfigs = appConfigs;
  //@ts-ignore
  window.envManager = envManager;
  //@ts-ignore
  window.socketEmitterStore = socketEmitterStore;
  //@ts-ignore
  window.websocket = websocket;
};

const utils = {
  checkErrorCodeIsConnAborted,
  correctErrorsAndPrint,
  createInputValidator,
  isCountrySelected,
  isIos,
  isValueLengthEqualToLength,
  isValueLengthInBetweenMinMax,
  makeNonBreakSpace,
  printCatchError,
  registerWindowCustomProperties,
  transformers,
};

export { utils };
