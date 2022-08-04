import { customTypeof } from "classes/CustomTypeof";
import { objectUtilities } from "classes/ObjectUtilities";

const errorThrower = (condition, error) => {
  if (condition) {
    if (customTypeof.check(error).type.function) throw error();
    throw error;
  }
};

const getErrorObject = (errorObject, extraData = {}, statusCode) => {
  const { errorKey, ...error } = errorObject;

  return {
    [errorKey]: { ...error, ...extraData },
    statusCode: statusCode || errorObject.statusCode,
  };
};

const extractVersions = (object) => {
  return objectUtilities.objectKeys(object).map((key) => object[key].version);
};

const isEqualWithTargetCellphone = (cellphone, targetCellphone) => {
  if (
    cellphone.phoneNumber === targetCellphone.phoneNumber &&
    cellphone.countryCode === targetCellphone.countryCode &&
    cellphone.countryName === targetCellphone.countryName
  ) {
    return true;
  }

  return false;
};

const excludeVersion = (object) => {
  const tempObject = {};

  for (const key in object) {
    const { version, ...childObject } = object[key];

    tempObject[key] = childObject;
  }

  return tempObject;
};

const cellphoneFinder = (cellphones, targetCellphone) => {
  let cellphoneIndex = -1;

  try {
    const cellphone = cellphones.find((cellphone, index) => {
      cellphoneIndex = index;
      return isEqualWithTargetCellphone(cellphone, targetCellphone);
    });
    return { cellphone, cellphoneIndex };
  } catch (error) {
    errorThrower(error, error);
  }
};

const isDataHasEqualityWithTargetCellphone = (data, targetCellphone) => {
  if (
    data.phoneNumber === targetCellphone.phoneNumber &&
    data.countryCode === targetCellphone.countryCode &&
    data.countryName === targetCellphone.countryName
  ) {
    return true;
  }

  return false;
};

//UNUSED
const evaluateValueLength = (value) => {
  const valueTypeof = customTypeof.check(value).type;

  if (valueTypeof.array || valueTypeof.string) return value.length;

  if (valueTypeof.object) return objectUtilities.objectKeysLength(value);

  return undefined;
};

export {
  cellphoneFinder,
  errorThrower,
  evaluateValueLength,
  excludeVersion,
  extractVersions,
  getErrorObject,
  isDataHasEqualityWithTargetCellphone,
  isEqualWithTargetCellphone,
};
