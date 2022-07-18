import { notificationBuilder } from "classes/Builders";

//#region //* errors
const VERIFY_TOKEN_NOT_FOUND = notificationBuilder
  .create()
  .description("Verify token is not defined, try again or call your service")
  .notificationCode(4000)
  .notificationReason("VERIFY_TOKEN_NOT_FOUND")
  .message("Verify token not defined")
  .build();

const ECONNABORTED = notificationBuilder
  .create()
  .description(
    "Your connection interrupted, please check your internet access and try again"
  )
  .notificationCode(4000)
  .notificationReason("ECONNABORTED")
  .message("Connection interrupted!")
  .build();
//#endregion //* errors

//#region //* successes

//#endregion //* successes

const successes = {};
const localErrors = { VERIFY_TOKEN_NOT_FOUND, ECONNABORTED };
const notifications = {
  localErrors,
  successes,
};
export { notifications };
