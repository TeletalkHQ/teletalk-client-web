import { authControllers } from "controllers/authControllers";
import { cellphoneControllers } from "controllers/cellphoneControllers";
import { messageControllers } from "controllers/messageControllers";
import { otherControllers } from "controllers/otherControllers";
import { stuffControllers } from "controllers/stuffControllers";

const controllers = {
  ...authControllers,
  ...cellphoneControllers,
  ...messageControllers,
  ...otherControllers,
  ...stuffControllers,
};

export { controllers };
