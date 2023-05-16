import { authControllers } from "src/controllers/auth";
import { privateChatControllers } from "src/controllers/privateChat";
import { otherControllers } from "src/controllers/other";
import { userControllers } from "src/controllers/user";

const controllers = {
  ...authControllers,
  ...privateChatControllers,
  ...otherControllers,
  ...userControllers,
};

export { controllers };
