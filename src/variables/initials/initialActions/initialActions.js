import { globalInitialActions } from "variables/initials/initialActions/globalInitialActions";
import { otherInitialActions } from "variables/initials/initialActions/otherInitialActions";
import { userInitialActions } from "variables/initials/initialActions/userInitialActions";
import { tempInitialActions } from "variables/initials/initialActions/tempInitialActions";
import { notificationInitialActions } from "variables/initials/initialActions/notificationInitialActions";

const actions = {
  otherInitialActions,
  userInitialActions,
  globalInitialActions,
  tempInitialActions,
  notificationInitialActions,
};

export { actions };
