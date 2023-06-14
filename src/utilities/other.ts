import { customTypeof } from "custom-typeof";
import { CountryItem } from "~/types";

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
    !customTypeof.isUndefined(navigator) &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)
  );
};

const isCountrySelected = (c: CountryItem | null) => {
  return !!(c?.countryCode && c?.countryName && c?.countryShortName);
};

const otherUtilities = {
  checkErrorCodeIsConnAborted,
  isCountrySelected,
  isIos,
  makeNonBreakSpace,
  printCatchError,
};

export { otherUtilities };
