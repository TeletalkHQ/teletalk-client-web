import { authControllers } from "src/controllers/auth";
import { cellphoneControllers } from "src/controllers/cellphone";
import { messageControllers } from "src/controllers/message";
import { otherControllers } from "src/controllers/other";
import { stuffControllers } from "src/controllers/stuff";

const controllers = {
  ...authControllers,
  ...cellphoneControllers,
  ...messageControllers,
  ...otherControllers,
  ...stuffControllers,
};

export { controllers };
