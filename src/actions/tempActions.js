import { actionCreator } from "functions/utilities/stateUtilities";

import { tempInitialActions } from "variables/initials/initialActions/tempInitialActions";

const {
  countryCodeInitialAction,
  countryNameInitialAction,
  firstNameInitialAction,
  lastNameInitialAction,
  messageInputInitialAction,
  phoneNumberInitialAction,
  resetTempStateInitialAction,
  selectedContactIdInitialAction,
  selectedCountryInitialAction,
  setMessagesInitialAction,
  verificationCodeInitialAction,
} = tempInitialActions;

const selectedContactId = (payload = selectedContactIdInitialAction.payload) =>
  actionCreator(selectedContactIdInitialAction.type, payload);

const selectedCountry = (payload = selectedCountryInitialAction.payload) =>
  actionCreator(selectedCountryInitialAction.type, payload);

const countryCodeOnChange = (payload = countryCodeInitialAction.payload) =>
  actionCreator(countryCodeInitialAction.type, payload);

const countryNameOnChange = (payload = countryNameInitialAction.payload) =>
  actionCreator(countryNameInitialAction.type, payload);

const firstNameOnChange = (payload = firstNameInitialAction.payload) =>
  actionCreator(firstNameInitialAction.type, payload);

const lastNameOnChange = (payload = lastNameInitialAction.payload) =>
  actionCreator(lastNameInitialAction.type, payload);

const messageInputOnChange = (payload = messageInputInitialAction.payload) =>
  actionCreator(messageInputInitialAction.type, payload);

const setMessages = (payload = setMessagesInitialAction.payload) =>
  actionCreator(setMessagesInitialAction.type, payload);

const phoneNumberOnChange = (payload = phoneNumberInitialAction.payload) =>
  actionCreator(phoneNumberInitialAction.type, payload);

const verificationCodeOnChange = (
  payload = verificationCodeInitialAction.payload
) => actionCreator(verificationCodeInitialAction.type, payload);

const resetTempState = () => actionCreator(resetTempStateInitialAction.type);

const tempActions = {
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

export { tempActions };
