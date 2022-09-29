import { initialCountry } from "variables/initials/initialValues/initialValues";
import { initialStates } from "variables/initials/initialStates/initialStates";

const {
  temp: { messageInputText, messages, tempUserState, verificationCode },
} = initialStates;

const selectedContactId = {
  payload: {
    selectedContactId: "",
  },
  type: "CONTACT_SELECTED",
};

const messageInputOnChange = {
  payload: {
    messageInputText,
  },
  type: "MESSAGE_INPUT_ONCHANGE",
};

const setMessages = {
  payload: {
    messages,
  },
  type: "SET_MESSAGES",
};

const countryNameOnChange = {
  payload: {
    countryName: tempUserState.countryName,
  },
  type: "COUNTRY_NAME_ONCHANGE",
};

const countryCodeOnChange = {
  payload: {
    countryCode: tempUserState.countryCode,
  },
  type: "COUNTRY_CODE_ONCHANGE",
};

const firstNameOnChange = {
  payload: {
    firstName: tempUserState.firstName,
  },
  type: "FIRST_NAME_ONCHANGE",
};
const lastNameOnChange = {
  payload: {
    lastName: tempUserState.lastName,
  },
  type: "LAST_NAME_ONCHANGE",
};

const phoneNumberOnChange = {
  payload: {
    phoneNumber: tempUserState.phoneNumber,
  },
  type: "PHONE_NUMBER_ONCHANGE",
};

const verificationCodeOnChange = {
  payload: {
    verificationCode,
  },
  type: "VERIFICATION_CODE_ONCHANGE",
};

const selectedCountry = {
  payload: {
    selectedCountry: initialCountry,
  },
  type: "SELECTED_COUNTRY_ONCHANGE",
};

const resetTempState = {
  type: "RESET_TEMP_STATE",
};

const tempInitialActions = {
  countryCodeOnChange,
  countryNameOnChange,
  firstNameOnChange,
  lastNameOnChange,
  messageInputOnChange,
  phoneNumberOnChange,
  resetTempState,
  selectedContactId,
  selectedCountry,
  setMessages,
  verificationCodeOnChange,
};

export { tempInitialActions };
