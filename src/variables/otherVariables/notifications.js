import { notificationBuilder } from "classes/NotificationBuilder";

//#region //* errors
const ECONNABORTED = notificationBuilder
  .create()
  .description(
    "Your connection interrupted, please check your internet access and try again"
  )
  .notificationCode(4000)
  .notificationReason("ECONNABORTED")
  .message("Connection interrupted!")
  .build();

const INPUT_FIELDS_MISSING = notificationBuilder
  .create()
  .description("Default error description")
  .message("Internal server error")
  .notificationCode(5000)
  .notificationReason("INPUT_FIELDS_MISSING")
  .build();
const INPUT_FIELDS_OVERLOAD = notificationBuilder
  .create()
  .description("Default error description")
  .message("Internal server error")
  .notificationCode(5000)
  .notificationReason("INPUT_FIELDS_OVERLOAD")
  .build();

const OUTPUT_FIELDS_MISSING = notificationBuilder
  .create()
  .description("Default error description")
  .message("Internal server error")
  .notificationCode(5000)
  .notificationReason("OUTPUT_FIELDS_MISSING")
  .build();
const OUTPUT_FIELDS_OVERLOAD = notificationBuilder
  .create()
  .description("Default error description")
  .message("Internal server error")
  .notificationCode(5000)
  .notificationReason("OUTPUT_FIELDS_OVERLOAD")
  .build();

const REQUIRED_FIELDS_NOT_DEFINED = notificationBuilder
  .create()
  .message(
    "Required fields is not denied, If you want to check io fields you need to provide required fields."
  )
  .notificationReason("REQUIRED_FIELDS_NOT_DEFINED")
  .build();
const REQUIRED_IO_FIELD_IS_NOT_OBJECT = notificationBuilder
  .create()
  .message("Required field is not object")
  .notificationReason()
  .build("REQUIRED_IO_FIELD_IS_NOT_OBJECT");
const REQUIRED_IO_FIELD_IS_NOT_ARRAY = notificationBuilder
  .create()
  .message("Required field is not array")
  .notificationReason()
  .build("REQUIRED_IO_FIELD_IS_NOT_ARRAY");

const URL_NOT_FOUND = notificationBuilder
  .create()
  .description("You forget to set url")
  .message("Url not found")
  .notificationReason("URL_NOT_FOUND")
  .build();

const VERIFY_TOKEN_NOT_FOUND = notificationBuilder
  .create()
  .description("Verify token is not defined, try again or call your service")
  .notificationCode(4000)
  .notificationReason("VERIFY_TOKEN_NOT_FOUND")
  .message("Verify token not defined")
  .build();
//#endregion //* errors

//#region //* success
const successNotifications = {};
//#endregion //* success

const errorNotifications = {
  ECONNABORTED,
  INPUT_FIELDS_MISSING,
  INPUT_FIELDS_OVERLOAD,
  OUTPUT_FIELDS_MISSING,
  OUTPUT_FIELDS_OVERLOAD,
  REQUIRED_FIELDS_NOT_DEFINED,
  REQUIRED_IO_FIELD_IS_NOT_ARRAY,
  REQUIRED_IO_FIELD_IS_NOT_OBJECT,
  URL_NOT_FOUND,
  VERIFY_TOKEN_NOT_FOUND,
};

const notifications = {
  error: errorNotifications,
  success: successNotifications,
};

export { notifications };
