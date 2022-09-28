import { actions } from "actions/actions";

import { defaultDialogStateItemProps } from "functions/utilities/stateUtilities";

const authenticationProgressChange = (authenticationProgress) =>
  actions.appProgressionChange({ authenticationProgress });

const dialogOpenCloseChangeHelper = (dialogName, open, props) =>
  actions.dialogOpenChange({
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
