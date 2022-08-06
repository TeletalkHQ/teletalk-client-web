import { customTypeof } from "classes/CustomTypeof";

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

export { errorThrower, getErrorObject };
