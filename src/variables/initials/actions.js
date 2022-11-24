import { defaultDialogStateItemProps } from "functions/utilities/stateUtilities";

import { initialObjects } from "variables/initials/objects";
import { initialStates } from "variables/initials/states";

const globalInitialState = initialStates.global();
const notificationInitialState = initialStates.notification();
const otherInitialState = initialStates.other();
const tempInitialState = initialStates.temp();
const userInitialState = initialStates.user();
// const messageInitialState = initialStates.message();

const globalInitialActions = {
  appDrawerOpenChange: {
    payload: {
      open: globalInitialState.appDrawer.anchor.left,
    },
    type: "APP_DRAWER_STATE_CHANGE",
  },
  appProgressionChange: {
    payload: globalInitialState.appProgressions,
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
      open: globalInitialState.loading.open,
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

const messageInitialActions = {
  updatePrivateChatMessages: {
    payload: {
      chatId: "",
      messages: [],
    },
    type: "UPDATE_PRIVATE_CHAT_MESSAGES",
  },
  resetMessageState: { type: "RESET_MESSAGE_STATE" },
};

const notificationInitialActions = {
  errorNotification: {
    payload: notificationInitialState.errorNotificationState,
    type: "ERROR_NOTIFICATION",
  },
};

const otherInitialActions = {
  getCountries: {
    payload: {
      countries: otherInitialState.countries,
    },
    type: "GET_COUNTRIES",
  },
  setWelcomeMessage: {
    payload: {
      welcomeMessage: otherInitialState.welcomeMessage,
    },
    type: "WELCOME",
  },
  resetOtherState: {
    type: "RESET_OTHER_STATE",
  },
};

const userInitialActions = {
  addNewContact: {
    payload: {
      newContact: initialObjects.contact(),
    },
    type: "ADD_NEW_CONTACT",
  },
  resetUserState: {
    type: "RESET_USER_STATE",
  },
  updateAllUserContacts: {
    payload: {
      contacts: userInitialState.contacts,
    },
    type: "UPDATE_USER_CONTACTS",
  },
  updateAllUserData: {
    payload: userInitialState,
    type: "UPDATE_ALL_USER_DATA",
  },
};

const tempInitialActions = {
  countryCodeOnChange: {
    payload: {
      countryCode: tempInitialState.countryCode,
    },
    type: "COUNTRY_CODE_ONCHANGE",
  },
  countryNameOnChange: {
    payload: {
      countryName: tempInitialState.countryName,
    },
    type: "COUNTRY_NAME_ONCHANGE",
  },
  firstNameOnChange: {
    payload: {
      firstName: tempInitialState.firstName,
    },
    type: "FIRST_NAME_ONCHANGE",
  },
  lastNameOnChange: {
    payload: {
      lastName: tempInitialState.lastName,
    },
    type: "LAST_NAME_ONCHANGE",
  },
  messageInputOnChange: {
    payload: {
      messageInputTextValue: tempInitialState.messageInputTextValue,
    },
    type: "MESSAGE_INPUT_ONCHANGE",
  },
  phoneNumberOnChange: {
    payload: {
      phoneNumber: tempInitialState.phoneNumber,
    },
    type: "PHONE_NUMBER_ONCHANGE",
  },
  resetTempState: {
    type: "RESET_TEMP_STATE",
  },
  selectedUserForPrivateChat: {
    payload: {
      selectedUserForPrivateChat: tempInitialState.selectedUserForPrivateChat,
    },
    type: "USER_SELECTED_FOR_PRIVATE_CHAT",
  },
  selectedCountry: {
    payload: {
      selectedCountry: initialObjects.country(),
    },
    type: "SELECTED_COUNTRY_ONCHANGE",
  },
  verificationCodeOnChange: {
    payload: {
      verificationCode: tempInitialState.verificationCode,
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
  ...messageInitialActions,
};
