import { windowUtilities } from "utility-store/src/classes/WindowUtilities";

import { appConfigs } from "classes/AppConfigs";

import { defaultDialogStateItemProps } from "functions/utilities/stateUtilities";

import { GLOBAL_LOADING_TYPES } from "variables/otherVariables/helpers";
import { initialValues } from "variables/initials/initialValues";

const {
  others: { appDrawerCurrentAnchor, startupViewMode },
} = appConfigs.getConfigs();

const defaultOtherState = () => ({
  countries: [],
  messages: [],
  messageInputText: "",
  selectedContact: initialValues.initialContact,
  welcomeMessage: "",
});

const defaultTempState = () => ({
  countryCode: "",
  countryName: "",
  firstName: "",
  lastName: "",
  messages: [],
  phoneNumber: "",
  selectedContact: {},
  selectedCountry: null,
  tempUserState: {},
  verificationCode: "",
  welcome: {
    message: "",
  },
});

const defaultUserState = () => ({
  bio: "",
  blacklist: [],
  chats: [],
  contacts: [],
  countryCode: "",
  countryName: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  privateId: "",
  username: "",
});

const defaultNotificationState = () => ({
  errorNotificationState: {
    description: "",
    errorCode: "",
    errorReason: "",
    message: "",
  },
});

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

const global = defaultGlobalState();
const notification = defaultNotificationState();
const other = defaultOtherState();
const temp = defaultTempState();
const user = defaultUserState();

const initialStates = {
  global,
  notification,
  other,
  temp,
  user,
};

const getInitialState = () => initialStates;

export {
  defaultGlobalState,
  defaultNotificationState,
  defaultOtherState,
  defaultTempState,
  defaultUserState,
  getInitialState,
  initialStates,
};
