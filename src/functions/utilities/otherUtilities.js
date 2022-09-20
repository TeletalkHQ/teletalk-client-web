import { Fragment } from "react";

import { customTypeof } from "utility-store/src/classes/CustomTypeof";

const checkErrorCodeIsConnAborted = (errorCode) => errorCode === "ECONNABORTED";

const errorThrower = (condition, error) => {
  if (condition) {
    if (customTypeof.check(error).type.isFunction) throw error();
    throw error;
  }
};

const printCatchError = (functionName, error) => {
  logger.error(`${functionName} catch, error: `);
  console.error(error);
};

const fixErrorBuilderErrors = (errorObject, extraData = {}) => {
  const { errorKey, ...error } = errorObject;

  return {
    [errorKey]: { ...error, ...extraData },
  };
};

const makeNonBreakSpace = (length) =>
  Array.from({ length }).map((_, i) => <Fragment key={i}>&nbsp;</Fragment>);

export {
  checkErrorCodeIsConnAborted,
  errorThrower,
  fixErrorBuilderErrors,
  makeNonBreakSpace,
  printCatchError,
};
