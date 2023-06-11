import { customTypeof } from "custom-typeof";

const checkErrorCodeIsConnAborted = (errorCode: string) =>
  errorCode === "ECONNABORTED";

const printCatchError = (error: Error, functionName: string) => {
  logger.error(`${functionName} catch, error: `);
  logger.error(error);
};

const fixErrorBuilderErrors = (error: Error, extraData = {}) => {
  const { errorKey, ...rest } = error;

  return {
    [errorKey]: { ...rest, ...extraData },
  };
};

const makeNonBreakSpace = (length: number) =>
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
