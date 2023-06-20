import { authControllers } from "~/controllers/auth";
import { otherControllers } from "~/controllers/other";
import { privateChatControllers } from "~/controllers/privateChat";
import { userControllers } from "~/controllers/user";

const controllers = {
  ...authControllers,
  ...privateChatControllers,
  ...otherControllers,
  ...userControllers,
};

export { controllers };
