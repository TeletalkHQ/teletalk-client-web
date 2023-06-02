import { actions } from "~/store/actions";
import { defaultDialogStateItemProps } from "~/store/global/initialState";
import { stateStatics } from "~/store/stateStatics";

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

const changeViewModeHelper = (viewMode) => actions.viewModeChange({ viewMode });
const changeViewMode = {
  checkCurrentUser: () =>
    changeViewModeHelper(stateStatics.VIEW_MODES.CHECK_CURRENT_USER),
  messenger: () => changeViewModeHelper(stateStatics.VIEW_MODES.MESSENGER),
  createUser: () =>
    changeViewModeHelper(stateStatics.VIEW_MODES.CREATE_NEW_USER),
  signIn: () => changeViewModeHelper(stateStatics.VIEW_MODES.SIGN_IN),
  verify: () => changeViewModeHelper(stateStatics.VIEW_MODES.VERIFY_SIGN_IN),
};
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
