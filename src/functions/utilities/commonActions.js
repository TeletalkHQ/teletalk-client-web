import { globalActions } from "actions/globalActions";

import { defaultDialogStateItemProps } from "functions/utilities/stateUtilities";

const { dialogOpenChangeAction, appProgressionChange } = globalActions;

const authenticationProgressChange = (authenticationProgress) =>
  appProgressionChange({ authenticationProgress });

const dialogOpenCloseChangeHelper = (dialogName, open, props) =>
  dialogOpenChangeAction({
    dialogName,
    open,
    props,
  });

const openDialog = (dialogName, props = defaultDialogStateItemProps()) =>
  dialogOpenCloseChangeHelper(dialogName, true, props);

const closeDialog = (dialogName, props = defaultDialogStateItemProps()) =>
  dialogOpenCloseChangeHelper(dialogName, false, props);

const commonActions = {
  authenticationProgressChange,
  closeDialog,
  openDialog,
};

export { authenticationProgressChange, commonActions };
