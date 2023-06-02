import { authControllers } from "~/controllers/auth";
import { privateChatControllers } from "~/controllers/privateChat";
import { otherControllers } from "~/controllers/other";
import { userControllers } from "~/controllers/user";

const controllers = {
  ...authControllers,
  ...privateChatControllers,
  ...otherControllers,
  ...userControllers,
};

export { controllers };
