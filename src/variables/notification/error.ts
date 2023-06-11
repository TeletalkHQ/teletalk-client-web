import { notificationBuilder } from "~/classes/NotificationBuilder";

const customErrors = {
  econnAborted: notificationBuilder
    .create()
    .reason("ECONNABORTED")
    .message("Connection interrupted!")
    .build(),
  eventIsBroken: notificationBuilder
    .create()
    .message("EVENT_IS_BROKEN")
    .reason("EVENT_IS_BROKEN")
    .build(),
  inputDataNotDefined: notificationBuilder
    .create()
    .message("inputDataNotDefined")
    .build(),
  inputFieldInvalidType: notificationBuilder
    .create()
    .message("inputFieldInvalidType")
    .build(),
  inputFieldsMissing: notificationBuilder
    .create()
    .message("inputFieldsMissing")
    .build(),
  inputFieldsOverload: notificationBuilder
    .create()
    .message("inputFieldsOverload")
    .build(),
  isNotACallback: notificationBuilder
    .create()
    .message("isNotACallback")
    .build(),
  outputDataNotDefined: notificationBuilder
    .create()
    .message("outputDataNotDefined")
    .build(),
  outputFieldInvalidType: notificationBuilder
    .create()
    .message("outputFieldInvalidType")
    .build(),
  outputFieldsMissing: notificationBuilder
    .create()
    .message("outputFieldsMissing")
    .build(),
  outputFieldsOverload: notificationBuilder
    .create()
    .message("outputFieldsOverload")
    .build(),
  outputFieldTypeWrong: notificationBuilder
    .create()
    .message("outputFieldTypeWrong")
    .build(),
  requiredFieldInvalid: notificationBuilder
    .create()
    .message("requiredFieldInvalid")
    .build(),
  requiredFieldInvalidType: notificationBuilder
    .create()
    .message("requiredFieldInvalidType")
    .build(),
  requiredFieldsNotDefined: notificationBuilder
    .create()
    .message("requiredFieldsNotDefined")
    .build(),
  requiredIoFieldIsNotArray: notificationBuilder
    .create()
    .message("requiredIoFieldIsNotArray")
    .build(),
  requiredIoFieldIsNotObject: notificationBuilder
    .create()
    .message("requiredIoFieldIsNotObject")
    .build(),
  requirementItemMissing: notificationBuilder
    .create()
    .message("REQUIREMENT_ITEM_MISSING")
    .reason("REQUIREMENT_ITEM_MISSING")
    .build(),
};

const INPUT = {
  ioDataFieldTypeWrongError: INPUT_FILED_TYPE_WRONG,
  missingFieldsError: INPUT_FIELDS_MISSING,
  overloadFieldsError: INPUT_FIELDS_OVERLOAD,
  requiredFieldsNotDefinedError: REQUIRED_FIELDS_NOT_DEFINED,
  requiredFieldTypeWrongError: REQUIRED_FIELD_TYPE_WRONG,
};

const OUTPUT = {
  ioDataFieldTypeWrongError: INPUT_FILED_TYPE_WRONG,
  missingFieldsError: OUTPUT_FIELDS_MISSING,
  overloadFieldsError: OUTPUT_FIELDS_OVERLOAD,
  requiredFieldsNotDefinedError: REQUIRED_FIELDS_NOT_DEFINED,
  requiredFieldTypeWrongError: REQUIRED_FIELD_TYPE_WRONG,
};

const error = {
  COMPONENT_NAME_REQUIRED,
  ECONNABORTED,
  EVENT_IS_BROKEN,
  INPUT_FIELDS_MISSING,
  INPUT_FIELDS_NOT_DEFINED_ERROR,
  INPUT_FIELDS_OVERLOAD,
  INPUT_FILED_TYPE_WRONG,
  OUTPUT_FIELDS_MISSING,
  OUTPUT_FIELDS_OVERLOAD,
  OUTPUT_FILED_TYPE_WRONG,
  REQUIRED_FIELD_TYPE_WRONG,
  REQUIRED_FIELDS_NOT_DEFINED,
  REQUIREMENT_ITEM_MISSING,
  URL_IS_BROKEN,
  URL_NOT_FOUND,
  IO: {
    INPUT,
    OUTPUT,
  },
};

export { error };
