import { VIEW_MODES } from "variables/others/staticValues";

//TODO Move some default values to appConfigs
const globalInitialState = {
  appDrawerState: {
    anchor: {
      bottom: false,
      left: false,
      right: false,
      top: false,
    },
    currentAnchor: "left",
  },
  globalLoadingState: {
    color: "#fff",
    open: true,
    progressColor: "inherit",
  },
  dialogState: {
    addNewContact: {
      open: false,
    },
    contacts: {
      open: false,
    },
    logout: {
      open: false,
    },
  },
  loadingState: {
    loading: false,
  },
  onlineStatus: {
    isOnline: window?.navigator.onLine,
    ping: 0,
  },
  viewMode: VIEW_MODES.SIGN_IN,
};

export { globalInitialState };
