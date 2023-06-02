import { notificationBuilder } from "~/classes/NotificationBuilder";

const COMPONENT_NAME_REQUIRED = notificationBuilder
  .create()
  .message("COMPONENT_NAME_REQUIRED")
  .notificationReason("COMPONENT_NAME_REQUIRED")
  .build();

const ECONNABORTED = notificationBuilder
  .create()
  .notificationReason("ECONNABORTED")
  .message("Connection interrupted!")
  .build();

const EVENT_IS_BROKEN = notificationBuilder
  .create()
  .message("EVENT_IS_BROKEN")
  .notificationReason("EVENT_IS_BROKEN")
  .build();

const INPUT_FIELDS_MISSING = notificationBuilder
  .create()
  .message("INPUT_FIELDS_MISSING")
  .notificationReason("INPUT_FIELDS_MISSING")
  .build();
const INPUT_FIELDS_OVERLOAD = notificationBuilder
  .create()
  .message("INPUT_FIELDS_OVERLOAD")
  .notificationReason("INPUT_FIELDS_OVERLOAD")
  .build();
const INPUT_FIELDS_NOT_DEFINED_ERROR = notificationBuilder
  .create()
  .message("INPUT_FIELDS_NOT_DEFINED_ERROR")
  .notificationReason("INPUT_FIELDS_NOT_DEFINED_ERROR")
  .build();
const INPUT_FILED_TYPE_WRONG = notificationBuilder
  .create()
  .notificationReason("INPUT_FILED_TYPE_WRONG");

const OUTPUT_FIELDS_MISSING = notificationBuilder
  .create()
  .message("OUTPUT_FIELDS_MISSING")
  .notificationReason("OUTPUT_FIELDS_MISSING")
  .build();
const OUTPUT_FIELDS_OVERLOAD = notificationBuilder
  .create()
  .message("OUTPUT_FIELDS_OVERLOAD")
  .notificationReason("OUTPUT_FIELDS_OVERLOAD")
  .build();
const OUTPUT_FILED_TYPE_WRONG = notificationBuilder
  .create()
  .message("OUTPUT_FILED_TYPE_WRONG")
  .notificationReason("OUTPUT_FILED_TYPE_WRONG")
  .build();

const REQUIRED_FIELDS_NOT_DEFINED = notificationBuilder
  .create()
  .message(
    "Required fields is not defined, If you want to check io fields you need to provide required fields."
  )
  .notificationReason("REQUIRED_FIELDS_NOT_DEFINED")
  .build();
const REQUIRED_FIELD_TYPE_WRONG = notificationBuilder
  .create()
  .message("REQUIRED_FIELD_TYPE_WRONG")
  .notificationReason("REQUIRED_FIELD_TYPE_WRONG")
  .build();

const REQUIREMENT_ITEM_MISSING = notificationBuilder
  .create()
  .message("REQUIREMENT_ITEM_MISSING")
  .notificationReason("REQUIREMENT_ITEM_MISSING")
  .build();

const URL_IS_BROKEN = notificationBuilder
  .create()
  .message("URL_IS_BROKEN")
  .notificationReason("URL_IS_BROKEN")
  .build();

const URL_NOT_FOUND = notificationBuilder
  .create()
  .message("URL_NOT_FOUND")
  .notificationReason("URL_NOT_FOUND")
  .build();

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
