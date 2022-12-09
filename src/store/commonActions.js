import { actions } from "src/store/actions";
import { defaultDialogStateItemProps } from "src/store/global/initialState";
import { stateStatics } from "src/store/stateStatics";

const changeAuthenticationProgress = (authenticationProgress) =>
  actions.appProgressionChange({ authenticationProgress });

const dialogOpenCloseChangeHelper = (dialogName, open, props) =>
  actions.dialogOpenChange({
    dialogName,
    open,
    props,
  });

const openDialog = (dialogName, props = defaultDialogStateItemProps().props) =>
  dialogOpenCloseChangeHelper(dialogName, true, props);

const closeDialog = (dialogName, props = defaultDialogStateItemProps().props) =>
  dialogOpenCloseChangeHelper(dialogName, false, props);

const openAppDrawer = () => actions.appDrawerOpenChange({ open: true });

const viewModeChanger = (viewMode) => actions.viewModeChange({ viewMode });
const changeViewMode = {
  fullPageLoading: () =>
    viewModeChanger(stateStatics.VIEW_MODES.FULL_PAGE_LOADING),
  messenger: () => viewModeChanger(stateStatics.VIEW_MODES.MESSENGER),
  createNewUser: () =>
    viewModeChanger(stateStatics.VIEW_MODES.NEW_USER_PROFILE),
  signIn: () => viewModeChanger(stateStatics.VIEW_MODES.SIGN_IN),
  verifySignIn: () => viewModeChanger(stateStatics.VIEW_MODES.VERIFY_SIGN_IN),
};

const commonActions = {
  changeAuthenticationProgress,
  changeViewMode,
  closeDialog,
  openAppDrawer,
  openDialog,
};

export { commonActions };
