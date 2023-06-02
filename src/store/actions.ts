import { authActions } from "~/store/auth/actions";
import { globalActions } from "~/store/global/actions";
import { messageActions } from "~/store/message/actions";
import { notificationActions } from "~/store/notification/actions";
import { otherActions } from "~/store/other/actions";
import { userActions } from "~/store/user/actions";
import { settingsActions } from "~/store/settings/actions";

const actions = {
  ...authActions,
  ...globalActions,
  ...messageActions,
  ...notificationActions,
  ...otherActions,
  ...settingsActions,
  ...userActions,
};

export { actions };
