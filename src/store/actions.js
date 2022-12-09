import { authActions } from "src/store/auth/actions";
import { globalActions } from "src/store/global/actions";
import { messageActions } from "src/store/message/actions";
import { notificationActions } from "src/store/notification/actions";
import { otherActions } from "src/store/other/actions";
import { userActions } from "src/store/user/actions";

const actions = {
  ...authActions,
  ...globalActions,
  ...messageActions,
  ...notificationActions,
  ...otherActions,
  ...userActions,
};

export { actions };
