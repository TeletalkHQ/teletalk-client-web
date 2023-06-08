import { Fragment } from "react";

import { customTypeof } from "custom-typeof";

const checkErrorCodeIsConnAborted = (errorCode: string) =>
  errorCode === "ECONNABORTED";

const printCatchError = (error, functionName) => {
  logger.error(`${functionName} catch, error: `);
  logger.error(error);
};

const fixErrorBuilderErrors = (error, extraData = {}) => {
  const { errorKey, ...rest } = error;

  return {
    [errorKey]: { ...rest, ...extraData },
  };
};

const makeNonBreakSpace = (length) =>
  Array.from({ length }).map((_) => "&nbsp;");

const isIos = () => {
  return (
    !customTypeof.isUndefined(navigator) &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)
  );
};

const isCountrySelected = (selectedCountry) => {
  const country = selectedCountry;

  return !!(
    country?.countryCode &&
    country?.countryName &&
    country?.countryShortName
  );
};

const otherUtilities = {
  checkErrorCodeIsConnAborted,
  fixErrorBuilderErrors,
  isCountrySelected,
  isIos,
  makeNonBreakSpace,
  printCatchError,
};

export { otherUtilities };
