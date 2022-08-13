import { notificationBuilder } from "classes/builders/NotificationBuilder";

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

//#region //* successes
const successes = {};
//#endregion //* successes

const INPUT_FIELDS_MISSING = notificationBuilder
  .create()
  .description("Default error description")
  .message("Internal server error")
  .notificationCode(5000)
  .notificationReason("INPUT_FIELDS_MISSING");
const INPUT_FIELDS_OVERLOAD = notificationBuilder
  .create()
  .description("Default error description")
  .message("Internal server error")
  .notificationCode(5000)
  .notificationReason("INPUT_FIELDS_OVERLOAD");
const OUTPUT_FIELDS_MISSING = notificationBuilder
  .create()
  .description("Default error description")
  .message("Internal server error")
  .notificationCode(5000)
  .notificationReason("OUTPUT_FIELDS_MISSING");
const OUTPUT_FIELDS_OVERLOAD = notificationBuilder
  .create()
  .description("Default error description")
  .message("Internal server error")
  .notificationCode(5000)
  .notificationReason("OUTPUT_FIELDS_OVERLOAD");

const localErrors = {
  ECONNABORTED,
  URL_NOT_FOUND,
  VERIFY_TOKEN_NOT_FOUND,
  INPUT_FIELDS_MISSING,
  INPUT_FIELDS_OVERLOAD,
  OUTPUT_FIELDS_MISSING,
  OUTPUT_FIELDS_OVERLOAD,
};

const notifications = {
  localErrors,
  successes,
};

export { notifications };
