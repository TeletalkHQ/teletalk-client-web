import { notificationBuilder } from "classes/Builders/NotificationBuilder";

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

//#endregion //* successes

const successes = {};
const localErrors = {
  ECONNABORTED,
  URL_NOT_FOUND,
  VERIFY_TOKEN_NOT_FOUND,
};
const notifications = {
  localErrors,
  successes,
};
export { notifications };
