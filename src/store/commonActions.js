import { actions } from "src/store/actions";
import { defaultDialogStateItemProps } from "src/store/global/initialState";
import { stateStatics } from "src/store/stateStatics";

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
  auth: () => changeViewModeHelper(stateStatics.VIEW_MODES.AUTH),
  messenger: () => changeViewModeHelper(stateStatics.VIEW_MODES.MESSENGER),
  createNewUser: () =>
    changeViewModeHelper(stateStatics.VIEW_MODES.NEW_USER_PROFILE),
  signIn: () => changeViewModeHelper(stateStatics.VIEW_MODES.SIGN_IN),
  verifySignIn: () =>
    changeViewModeHelper(stateStatics.VIEW_MODES.VERIFY_SIGN_IN),
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
