import { windowUtilities } from "classes/WindowUtilities";

import { VIEW_MODES } from "variables/others/constants";

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
  appProgressions: {
    authenticationProgress: false,
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
  onlineStatus: {
    isOnline: windowUtilities.isOnline(),
    ping: 0,
  },
  viewMode: VIEW_MODES.SIGN_IN,
};

export { globalInitialState };
