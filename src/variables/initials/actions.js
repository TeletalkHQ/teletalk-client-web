import { defaultDialogStateItemProps } from "functions/utilities/stateUtilities";

import { initialObjects } from "variables/initials/objects";
import { initialStates } from "variables/initials/states";

const tempInitialState = initialStates.temp();

const globalInitialState = initialStates.global();
const userInitialState = initialStates.user();

const otherInitialState = initialStates.other();

const notificationInitialState = initialStates.notification();

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

const notificationInitialActions = {
  errorNotification: {
    payload: notificationInitialState.errorNotificationState,
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
  setMessages: {
    payload: {
      messages: tempInitialState.messages,
    },
    type: "SET_MESSAGES",
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
};
