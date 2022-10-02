import { checkFields } from "utility-store/src/classes/CheckFields";
import { customTypeof } from "utility-store/src/classes/CustomTypeof";
import { trier } from "utility-store/src/classes/Trier";

import { errorThrower } from "functions/utilities/otherUtilities";

import { notifications } from "variables/notifications/notifications";

const {
  error: {
    REQUIRED_FIELDS_NOT_DEFINED,
    REQUIRED_IO_FIELD_IS_NOT_ARRAY,
    REQUIRED_IO_FIELD_IS_NOT_OBJECT,
  },
} = notifications;

const ioFieldsCheckerDefaultOptions = {
  missingFieldsError: {},
  overloadFieldsError: {},
  requiredFieldsIndex: 0,
};

const getSelectedRequiredFields = (requiredFields, index) =>
  requiredFields[index];

const throwErrorIfSelectedRequiredFieldsIsNotDefined = (
  selectedRequiredFields
) => {
  errorThrower(
    customTypeof.isUndefined(selectedRequiredFields),
    REQUIRED_FIELDS_NOT_DEFINED
  );
};

const tryCheckFields = (
  ioData,
  requiredFields,
  requiredFieldsIndex,
  missingFieldsError,
  overloadFieldsError
) => {
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

  return { ok: true };
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

  return trier(ioFieldsChecker.name)
    .try(
      tryCheckFields,
      ioData,
      requiredFields,
      requiredFieldsIndex,
      missingFieldsError,
      overloadFieldsError
    )
    .catch((error) => ({
      ok: false,
      errorObject: error,
    }))
    .printAndThrow()
    .result();
};

export { ioFieldsChecker };
