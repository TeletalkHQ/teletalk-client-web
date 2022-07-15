import { errorBuilder } from "classes/Builders";

const VERIFY_TOKEN_NOT_FOUND = errorBuilder
  .create()
  .description("Verify token is not defined, try again or call your service")
  .notificationCode(4000)
  .errorReason("VERIFY_TOKEN_NOT_FOUND")
  .message("Verify token not defined")
  .build();

const ECONNABORTED = errorBuilder
  .create()
  .description(
    "Your connection interrupted, please check your internet access and try again"
  )
  .notificationCode(4000)
  .errorReason("ECONNABORTED")
  .message("Connection interrupted!")
  .build();

const errors = { VERIFY_TOKEN_NOT_FOUND, ECONNABORTED };

export { errors };
