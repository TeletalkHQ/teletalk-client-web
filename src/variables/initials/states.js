import { windowUtilities } from "utility-store/src/classes/WindowUtilities";

import { appConfigs } from "classes/AppConfigs";

import { defaultDialogStateItemProps } from "functions/utilities/stateUtilities";

import { GLOBAL_LOADING_TYPES } from "variables/otherVariables/helpers";
import { initialObjects } from "variables/initials/objects";

const {
  others: { appDrawerCurrentAnchor, startupViewMode },
} = appConfigs.getConfigs();

const defaultGlobalState = () => ({
  appDrawer: {
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
  loading: {
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

const defaultMessageState = () => ({
  privateChatMessages: [],
});

const defaultNotificationState = () => ({
  errorNotificationState: {
    description: "",
    errorCode: "",
    errorReason: "",
    message: "",
  },
});

const defaultOtherState = () => ({
  countries: [],
  welcomeMessage: "",
});

const defaultTempState = () => ({
  countryCode: "",
  countryName: "",
  firstName: "",
  lastName: "",
  messageInputTextValue: "",
  messages: [],
  phoneNumber: "",
  selectedCountry: null,
  selectedUserForPrivateChat: initialObjects.contact(),
  verificationCode: "",
});

const defaultUserState = () => ({
  bio: "",
  blacklist: [],
  chatInfo: [],
  contacts: [],
  countryCode: "",
  countryName: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  userId: "",
  username: "",
});

const initialStates = {
  global: defaultGlobalState,
  message: defaultMessageState,
  notification: defaultNotificationState,
  other: defaultOtherState,
  temp: defaultTempState,
  user: defaultUserState,
};

const getInitialState = () => ({
  global: defaultGlobalState(),
  notification: defaultNotificationState(),
  other: defaultOtherState(),
  temp: defaultTempState(),
  user: defaultUserState(),
});

export { getInitialState, initialStates };
