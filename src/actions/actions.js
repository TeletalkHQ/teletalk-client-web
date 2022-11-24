import { globalActions } from "actions/global";
import { messageActions } from "actions/message";
import { notificationActions } from "actions/notification";
import { otherActions } from "actions/other";
import { tempActions } from "actions/temp";
import { userActions } from "actions/user";

const actions = {
  ...globalActions,
  ...messageActions,
  ...notificationActions,
  ...otherActions,
  ...tempActions,
  ...userActions,
};

export { actions };
