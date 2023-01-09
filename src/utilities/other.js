import { Fragment } from "react";

import { customTypeof } from "custom-typeof";

const checkErrorCodeIsConnAborted = (errorCode) => errorCode === "ECONNABORTED";

const errorThrower = (condition, error) => {
  if (condition) {
    if (customTypeof.isFunction(error)) throw error();
    throw error;
  }
};

const printCatchError = (error, functionName) => {
  logger.error(`${functionName} catch, error: `);
  logger.error(error);
};

const fixErrorBuilderErrors = (errorObject, extraData = {}) => {
  const { errorKey, ...error } = errorObject;

  return {
    [errorKey]: { ...error, ...extraData },
  };
};

const makeNonBreakSpace = (length) =>
  Array.from({ length }).map((_, i) => <Fragment key={i}>&nbsp;</Fragment>);

const isIos = () => {
  return (
    !customTypeof.isUndefined(navigator) &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)
  );
};

const isCountrySelected = (selectedCountry) => {
  const country = selectedCountry;

  return !!(
    country.countryCode &&
    country.countryName &&
    country.countryShortName
  );
};

const otherUtilities = {
  checkErrorCodeIsConnAborted,
  errorThrower,
  fixErrorBuilderErrors,
  isCountrySelected,
  isIos,
  makeNonBreakSpace,
  printCatchError,
};

export { otherUtilities };
