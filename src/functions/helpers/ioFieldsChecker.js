import { checkFields } from "utility-store/src/classes/CheckFields";
import { customTypeof } from "utility-store/src/classes/CustomTypeof";

import { errorThrower } from "functions/utilities/otherUtilities";

import { notifications } from "variables/otherVariables/notifications";

//TODO Move to utility-store

const {
  localErrors: {
    REQUIRED_FIELDS_NOT_DEFINED,
    REQUIRED_IO_FIELD_IS_NOT_ARRAY,
    REQUIRED_IO_FIELD_IS_NOT_OBJECT,
  },
} = notifications;

const ioFieldsCheckerDefaultOptions = {
  requiredFieldsIndex: 0,
  missingFieldsError: {},
  overloadFieldsError: {},
};

const getSelectedRequiredFields = (requiredFields, index) =>
  requiredFields[index];

const throwErrorIfSelectedRequiredFieldsIsNotDefined = (
  selectedRequiredFields
) => {
  errorThrower(
    customTypeof.check(selectedRequiredFields).type.isUndefined,
    REQUIRED_FIELDS_NOT_DEFINED
  );
};

const ioFieldsChecker = (
  ioData,
  requiredFields,
  options = ioFieldsCheckerDefaultOptions
) => {
  const {
    missingFieldsError,
    overloadFieldsError,
    requiredFieldsIndex = 0,
  } = {
    ...ioFieldsCheckerDefaultOptions,
    ...options,
  };

  try {
    const selectedRequiredFields = getSelectedRequiredFields(
      requiredFields,
      requiredFieldsIndex
    );

    throwErrorIfSelectedRequiredFieldsIsNotDefined(selectedRequiredFields);

    checkFields(
      ioData,
      selectedRequiredFields,
      missingFieldsError,
      overloadFieldsError,
      REQUIRED_IO_FIELD_IS_NOT_ARRAY,
      REQUIRED_IO_FIELD_IS_NOT_OBJECT
    ).check();

    return { done: true };
  } catch (error) {
    return {
      done: false,
      errorObject: error,
    };
  }
};

export { ioFieldsChecker };
