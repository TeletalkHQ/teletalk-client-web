import { customTypeof } from "utility-store/src/classes/CustomTypeof";

import { checkFields } from "classes/CheckFields";

import { errorThrower } from "functions/utilities/otherUtilities";

import { notifications } from "variables/otherVariables/notifications";

const {
  localErrors: { REQUIRED_FIELDS_NOT_DEFINED },
} = notifications;

const ioFieldsCheckerDefaultOptions = {
  requiredFieldsIndex: 0,
  missingFieldsError: {},
  overloadFieldsError: {},
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
      overloadFieldsError
    ).check();

    return { done: true };
  } catch (error) {
    return {
      done: false,
      errorObject: error,
    };
  }
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

export { ioFieldsChecker };
