import { initialStates } from "variables/initials/initialStates/initialStates";
import { initialCountry } from "variables/initials/initialValues/initialValues";

const {
  tempState: {
    messageInputText,
    messages,
    selectedContact,
    tempUserState,
    verifyCode,
  },
} = initialStates;

const contactSelectedInitialAction = {
  type: "CONTACT_SELECTED",
  payload: { selectedContact },
};

const messageInputInitialAction = {
  type: "MESSAGE_INPUT_ONCHANGE",
  payload: { messageInputText },
};

const setMessagesInitialAction = {
  type: "SET_MESSAGES",
  payload: { messages },
};

const countryNameInitialAction = {
  type: "COUNTRY_NAME_ONCHANGE",
  payload: { countryName: tempUserState.countryName },
};

const countryCodeInitialAction = {
  type: "COUNTRY_CODE_ONCHANGE",
  payload: { countryCode: tempUserState.countryCode },
};

const firstNameInitialAction = {
  type: "FIRST_NAME_ONCHANGE",
  payload: { firstName: tempUserState.firstName },
};
const lastNameInitialAction = {
  type: "LAST_NAME_ONCHANGE",
  payload: { lastName: tempUserState.lastName },
};

const phoneNumberInitialAction = {
  type: "PHONE_NUMBER_ONCHANGE",
  payload: { phoneNumber: tempUserState.phoneNumber },
};

const verifyCodeInitialAction = {
  type: "VERIFY_CODE_ONCHANGE",
  payload: { verifyCode },
};

const selectedCountryInitialAction = {
  type: "SELECTED_COUNTRY_ONCHANGE",
  payload: { selectedCountry: initialCountry },
};

const tempInitialActions = {
  contactSelectedInitialAction,
  countryCodeInitialAction,
  countryNameInitialAction,
  firstNameInitialAction,
  lastNameInitialAction,
  messageInputInitialAction,
  phoneNumberInitialAction,
  selectedCountryInitialAction,
  setMessagesInitialAction,
  verifyCodeInitialAction,
};

export { tempInitialActions };
