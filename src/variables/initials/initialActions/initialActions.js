import { globalInitialActions } from "variables/initials/initialActions/globalInitialActions";
import { notificationInitialActions } from "variables/initials/initialActions/notificationInitialActions";
import { otherInitialActions } from "variables/initials/initialActions/otherInitialActions";
import { tempInitialActions } from "variables/initials/initialActions/tempInitialActions";
import { userInitialActions } from "variables/initials/initialActions/userInitialActions";

export const initialActions = {
  ...globalInitialActions,
  ...notificationInitialActions,
  ...otherInitialActions,
  ...tempInitialActions,
  ...userInitialActions,
};
