import { globalActions } from "actions/globalActions";
import { notificationActions } from "actions/notificationActions";
import { otherActions } from "actions/otherActions";
import { tempActions } from "actions/tempActions";
import { userActions } from "actions/userActions";

const actions = {
  ...globalActions,
  ...notificationActions,
  ...otherActions,
  ...tempActions,
  ...userActions,
};

export { actions };
