import { notificationManager } from "src/classes/NotificationManager";
import { userUtilities } from "src/classes/UserUtilities";

import { actions } from "src/store/actions";
import { commonActions } from "src/store/commonActions";

import { variables } from "src/variables";

const update = (data, dispatch) => {
  userUtilities.removeToken();
  userUtilities.saveToken(data.token);

  dispatch(actions.updateAllUserData(data.user));
  dispatch(commonActions.changeViewMode.messenger());
};

const printTokenNotFound = () =>
  notificationManager.submitErrorNotification(
    variables.notification.error.VERIFY_TOKEN_NOT_FOUND
  );

const authUtilities = { printTokenNotFound, update };

export { authUtilities };
