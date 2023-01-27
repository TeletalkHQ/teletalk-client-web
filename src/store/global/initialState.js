import { appConfigs } from "src/classes/AppConfigs";

import { stateStatics } from "src/store/stateStatics";

const defaultDialogStateItemProps = () => ({
  open: false,
  //TODO: read default value from mui
  props: { zIndex: 1300 },
});

const initialGlobalState = () => ({
  appDrawer: {
    anchor: {
      bottom: false,
      left: false,
      right: false,
      top: false,
    },
    currentAnchor: appConfigs.getConfigs().ui.appDrawerCurrentAnchor,
  },
  appProgressions: {
    authenticationProgress: false,
  },
  dialogState: {
    addContact: defaultDialogStateItemProps(),
    contacts: defaultDialogStateItemProps(),
    logout: defaultDialogStateItemProps(),
    settings: defaultDialogStateItemProps(),
  },
  globalLoading: {
    color: "blue",
    open: false,
    progressColor: "inherit",
    size: 80,
    speedMultiplier: 1,
    type: stateStatics.GLOBAL_LOADING_TYPES.FULL_PAGE,
  },
  onlineStatus: {
    isOnline: false,
    ping: 0,
  },
  viewMode: stateStatics.VIEW_MODES.INITIAL_SETUP,
  initialSetupDetails: {
    status: stateStatics.INITIAL_SETUP_STATUS.NEVER,
  },
});

export { initialGlobalState, defaultDialogStateItemProps };
