import { appConfigs } from "classes/AppConfigs";
import { windowUtilities } from "classes/WindowUtilities";
import { GLOBAL_LOADING_TYPES } from "variables/otherVariables/constants";

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
    color: "blue",
    //TODO Move it to configs
    open: true,
    progressColor: "inherit",
    type: GLOBAL_LOADING_TYPES.FULL_PAGE,
    size: 80,
    speedMultiplier: 1,
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
