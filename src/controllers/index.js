import { authControllers } from "controllers/auth";
import { cellphoneControllers } from "controllers/cellphone";
import { messageControllers } from "controllers/message";
import { otherControllers } from "controllers/other";
import { stuffControllers } from "controllers/stuff";

const controllers = {
  ...authControllers,
  ...cellphoneControllers,
  ...messageControllers,
  ...otherControllers,
  ...stuffControllers,
};

export { controllers };
