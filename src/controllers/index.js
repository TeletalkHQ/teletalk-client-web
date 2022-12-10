import { authControllers } from "src/controllers/auth";
import { cellphoneControllers } from "src/controllers/cellphone";
import { messageControllers } from "src/controllers/message";
import { otherControllers } from "src/controllers/other";
import { stuffControllers } from "src/controllers/stuff";
import { userControllers } from "src/controllers/user";

const controllers = {
  ...authControllers,
  ...cellphoneControllers,
  ...messageControllers,
  ...otherControllers,
  ...stuffControllers,
  ...userControllers,
};

export { controllers };
