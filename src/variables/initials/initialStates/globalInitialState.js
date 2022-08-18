import { appConfigs } from "classes/AppConfigs";
import { windowUtilities } from "classes/WindowUtilities";

const {
  others: { appDrawerCurrentAnchor, startupViewMode },
} = appConfigs.getConfigs();

const globalInitialState = {
  appDrawerState: {
    anchor: {
      bottom: false,
      left: false,
      right: false,
      top: false,
    },
    currentAnchor: appDrawerCurrentAnchor,
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
  viewMode: startupViewMode,
};

export { globalInitialState };
