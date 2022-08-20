import { Fragment } from "react";

import { customTypeof } from "classes/CustomTypeof";

const checkErrorCodeIsConnAborted = (errorCode) => errorCode === "ECONNABORTED";

const errorThrower = (condition, error) => {
  if (condition) {
    if (customTypeof.check(error).type.function) throw error();
    throw error;
  }
};

const printCatchError = (functionName, error) => {
  logger.error(`${functionName} catch, error: ${error}`);
};

const getErrorObject = (errorObject, extraData = {}, statusCode) => {
  const { errorKey, ...error } = errorObject;

  return {
    [errorKey]: { ...error, ...extraData },
    statusCode: statusCode || errorObject.statusCode,
  };
};

const makeNonBreakSpace = (length) =>
  Array.from({ length }).map((_, i) => <Fragment key={i}>&nbsp;</Fragment>);

export {
  checkErrorCodeIsConnAborted,
  errorThrower,
  getErrorObject,
  makeNonBreakSpace,
  printCatchError,
};
