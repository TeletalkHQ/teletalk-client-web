import { notificationBuilder } from "~/classes/NotificationBuilder";
import { stuffStore } from "~/classes/StuffStore";

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

const errors = {
  ...customErrors,
  ...stuffStore.errors,
};

const requiredFieldErrors = {
  schemaInvalid: errors.requiredFieldInvalid,
  schemaInvalidType: errors.requiredFieldInvalidType,
  schemaNotDefined: errors.requiredFieldsNotDefined,
};

const checkFieldErrors = {
  input: {
    ...requiredFieldErrors,
    dataFieldInvalidType: errors.inputFieldInvalidType,
    dataFieldsMissing: errors.inputFieldsMissing,
    dataFieldsOverload: errors.inputFieldsOverload,
    dataNotDefined: errors.inputDataNotDefined,
  },
  output: {
    ...requiredFieldErrors,
    dataFieldInvalidType: errors.outputFieldInvalidType,
    dataFieldsMissing: errors.outputFieldsMissing,
    dataFieldsOverload: errors.outputFieldsOverload,
    dataNotDefined: errors.outputDataNotDefined,
  },
};

export { errors, checkFieldErrors };
