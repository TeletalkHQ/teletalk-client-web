import { errorBuilder } from "classes/Builders";

const VERIFY_TOKEN_NOT_FOUND = errorBuilder
  .create()
  .description("Verify token is not defined, try again or call your service")
  .errorCode(4000)
  .errorReason("verifyTokenUndefined")
  .message("Verify token not defined")
  .build();

const errors = { VERIFY_TOKEN_NOT_FOUND };

export { errors };
