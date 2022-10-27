import { actionCreator } from "functions/utilities/stateUtilities";

import { initialActions } from "variables/initials/actions";

const selectedUserForPrivateChat = (
  payload = initialActions.selectedUserForPrivateChat.payload
) => actionCreator(initialActions.selectedUserForPrivateChat.type, payload);

const selectedCountry = (payload = initialActions.selectedCountry.payload) =>
  actionCreator(initialActions.selectedCountry.type, payload);

const countryCodeOnChange = (
  payload = initialActions.countryCodeOnChange.payload
) => actionCreator(initialActions.countryCodeOnChange.type, payload);

const countryNameOnChange = (
  payload = initialActions.countryNameOnChange.payload
) => actionCreator(initialActions.countryNameOnChange.type, payload);

const firstNameOnChange = (
  payload = initialActions.firstNameOnChange.payload
) => actionCreator(initialActions.firstNameOnChange.type, payload);

const lastNameOnChange = (payload = initialActions.lastNameOnChange.payload) =>
  actionCreator(initialActions.lastNameOnChange.type, payload);

const messageInputOnChange = (
  payload = initialActions.messageInputOnChange.payload
) => actionCreator(initialActions.messageInputOnChange.type, payload);

const setMessages = (payload = initialActions.setMessages.payload) =>
  actionCreator(initialActions.setMessages.type, payload);

const phoneNumberOnChange = (
  payload = initialActions.phoneNumberOnChange.payload
) => actionCreator(initialActions.phoneNumberOnChange.type, payload);

const verificationCodeOnChange = (
  payload = initialActions.verificationCodeOnChange.payload
) => actionCreator(initialActions.verificationCodeOnChange.type, payload);

const resetTempState = () => actionCreator(initialActions.resetTempState.type);

const tempActions = {
  countryCodeOnChange,
  countryNameOnChange,
  firstNameOnChange,
  lastNameOnChange,
  messageInputOnChange,
  phoneNumberOnChange,
  resetTempState,
  selectedUserForPrivateChat,
  selectedCountry,
  setMessages,
  verificationCodeOnChange,
};

export { tempActions };
