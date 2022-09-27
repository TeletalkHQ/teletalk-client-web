import { windowUtilities } from "utility-store/src/classes/WindowUtilities";

import { appConfigs } from "classes/AppConfigs";

import { defaultDialogStateItemProps } from "functions/utilities/stateUtilities";

import { GLOBAL_LOADING_TYPES } from "variables/otherVariables/constants";

const {
  others: { appDrawerCurrentAnchor, startupViewMode },
} = appConfigs.getConfigs();

const defaultGlobalState = () => ({
  appDrawerState: {
    anchor: {
      bottom: false,
      left: false,
      right: false,
      top: false,
    },
    currentAnchor: appDrawerCurrentAnchor,
  },
  appProgressions: {
    authenticationProgress: false,
  },
  dialogState: {
    addNewContact: defaultDialogStateItemProps(),
    contacts: defaultDialogStateItemProps(),
    logout: defaultDialogStateItemProps(),
  },
  globalLoadingState: {
    color: "blue",
    //TODO Move it to configs
    open: true,
    progressColor: "inherit",
    size: 80,
    speedMultiplier: 1,
    type: GLOBAL_LOADING_TYPES.FULL_PAGE,
  },
  onlineStatus: {
    isOnline: windowUtilities.isOnline(),
    ping: 0,
  },
  viewMode: startupViewMode,
});

const globalInitialState = defaultGlobalState();

export { defaultGlobalState, globalInitialState };
