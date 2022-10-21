import { defaultDialogStateItemProps } from "functions/utilities/stateUtilities";

import { initialObjects } from "variables/initials/initialObjects";
import { initialStates } from "variables/initials/initialStates";

const {
  temp: { messageInputText, messages, tempUserState, verificationCode },
} = initialStates;

const {
  global: { appDrawer, appProgressions, loading },
  global,
} = initialStates;

const { user } = initialStates;

const {
  other: { countries, welcomeMessage },
} = initialStates;

const {
  notification: { errorNotificationState },
} = initialStates;

const globalInitialActions = {
  appDrawerOpenChange: {
    payload: {
      open: appDrawer.anchor.left,
    },
    type: "APP_DRAWER_STATE_CHANGE",
  },
  appProgressionChange: {
    payload: appProgressions,
    type: "APP_PROGRESSION_CHANGE",
  },
  dialogOpenChange: {
    payload: {
      ...defaultDialogStateItemProps(),
      dialogName: "",
    },
    type: "DIALOG_OPEN_STATE_CHANGE",
  },
  globalLoadingOpenChange: {
    payload: {
      open: loading.open,
    },
    type: "GLOBAL_LOADING_STATE_CHANGE",
  },
  onlineStatusChange: {
    payload: global.onlineStatus,
    type: "ONLINE_STATUS",
  },
  resetGlobalState: {
    type: "RESET_GLOBAL_STATE",
  },
  viewModeChange: {
    payload: {
      viewMode: global.viewMode,
    },
    type: "VIEW_MODE_ONCHANGE",
  },
};

const otherInitialActions = {
  getCountries: {
    payload: {
      countries,
    },
    type: "GET_COUNTRIES",
  },
  selectContact: {
    payload: initialObjects.contact(),
    type: "SELECT_CONTACT",
  },
  setWelcomeMessage: {
    payload: { welcomeMessage },
    type: "WELCOME",
  },
  resetOtherState: {
    type: "RESET_OTHER_STATE",
  },
};

const notificationInitialActions = {
  errorNotification: {
    payload: errorNotificationState,
    type: "ERROR_NOTIFICATION",
  },
};

const userInitialActions = {
  addNewContact: {
    payload: {
      newContact: initialObjects.contact(),
    },
    type: "ADD_NEW_CONTACT",
  },
  addNewMessageToChat: {
    payload: {
      chatId: "",
      newMessage: "",
    },
    type: "ADD_NEW_MESSAGE_TO_CHAT",
  },
  resetUserState: {
    type: "RESET_USER_STATE",
  },
  updateAllChatMessages: {
    payload: {
      chatId: "",
      messages: [],
    },
    type: "UPDATE_ALL_CHAT_MESSAGES",
  },
  updateAllUserContacts: {
    payload: {
      contacts: user.contacts,
    },
    type: "UPDATE_USER_CONTACTS",
  },
  updateAllUserData: {
    payload: user,
    type: "UPDATE_ALL_USER_DATA",
  },
};

const tempInitialActions = {
  countryCodeOnChange: {
    payload: {
      countryCode: tempUserState.countryCode,
    },
    type: "COUNTRY_CODE_ONCHANGE",
  },
  countryNameOnChange: {
    payload: {
      countryName: tempUserState.countryName,
    },
    type: "COUNTRY_NAME_ONCHANGE",
  },
  firstNameOnChange: {
    payload: {
      firstName: tempUserState.firstName,
    },
    type: "FIRST_NAME_ONCHANGE",
  },
  lastNameOnChange: {
    payload: {
      lastName: tempUserState.lastName,
    },
    type: "LAST_NAME_ONCHANGE",
  },
  messageInputOnChange: {
    payload: {
      messageInputText,
    },
    type: "MESSAGE_INPUT_ONCHANGE",
  },
  phoneNumberOnChange: {
    payload: {
      phoneNumber: tempUserState.phoneNumber,
    },
    type: "PHONE_NUMBER_ONCHANGE",
  },
  resetTempState: {
    type: "RESET_TEMP_STATE",
  },
  selectedContactId: {
    payload: {
      selectedContactId: "",
    },
    type: "CONTACT_SELECTED",
  },
  selectedCountry: {
    payload: {
      selectedCountry: initialObjects.country(),
    },
    type: "SELECTED_COUNTRY_ONCHANGE",
  },
  setMessages: {
    payload: {
      messages,
    },
    type: "SET_MESSAGES",
  },
  verificationCodeOnChange: {
    payload: {
      verificationCode,
    },
    type: "VERIFICATION_CODE_ONCHANGE",
  },
};

export const initialActions = {
  ...globalInitialActions,
  ...notificationInitialActions,
  ...otherInitialActions,
  ...tempInitialActions,
  ...userInitialActions,
};
