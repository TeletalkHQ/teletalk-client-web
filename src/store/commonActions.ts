import { actions } from "~/store/actions";
import { defaultDialogStateItemProps } from "~/store/global/initialState";

const changeAuthenticationProgress = (authenticationProgress) =>
  actions.appProgressionChange({ authenticationProgress });

const dialogOpenChangeHelper = (dialogName, open, props) =>
  actions.dialogOpenChange({
    dialogName,
    open,
    props,
  });
const openDialog = (dialogName, props = defaultDialogStateItemProps().props) =>
  dialogOpenChangeHelper(dialogName, true, props);
const closeDialog = (dialogName, props = defaultDialogStateItemProps().props) =>
  dialogOpenChangeHelper(dialogName, false, props);

const openAppDrawer = () => actions.appDrawerOpenChange({ open: true });

const globalLoadingOpenChangeHelper = (open) =>
  actions.globalLoadingOpenChange({ open });
const closeGlobalLoading = () => globalLoadingOpenChangeHelper(false);
const openGlobalLoading = () => globalLoadingOpenChangeHelper(true);

const commonActions = {
  changeAuthenticationProgress,
  changeViewMode,
  closeDialog,
  closeGlobalLoading,
  openAppDrawer,
  openDialog,
  openGlobalLoading,
};

export { commonActions };
