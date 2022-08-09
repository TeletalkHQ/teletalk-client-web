import { actionCreator } from "functions/utilities/stateUtils";

import { tempInitialActions } from "variables/initials/initialActions/tempInitialActions";

const {
  countryCodeInitialAction,
  countryNameInitialAction,
  firstNameInitialAction,
  lastNameInitialAction,
  messageInputInitialAction,
  phoneNumberInitialAction,
  selectedContactIdInitialAction,
  selectedCountryInitialAction,
  setMessagesInitialAction,
  verificationCodeInitialAction,
} = tempInitialActions;

const selectedContactId = (payload = selectedContactIdInitialAction.payload) =>
  actionCreator(selectedContactIdInitialAction.type, payload);

const selectedCountryAction = (
  payload = selectedCountryInitialAction.payload
) => actionCreator(selectedCountryInitialAction.type, payload);

const countryCodeOnChangeAction = (
  payload = countryCodeInitialAction.payload
) => actionCreator(countryCodeInitialAction.type, payload);

const countryNameOnChangeAction = (
  payload = countryNameInitialAction.payload
) => actionCreator(countryNameInitialAction.type, payload);

const firstNameOnChangeAction = (payload = firstNameInitialAction.payload) =>
  actionCreator(firstNameInitialAction.type, payload);

const lastNameOnChangeAction = (payload = lastNameInitialAction.payload) =>
  actionCreator(lastNameInitialAction.type, payload);

const messageInputOnChangeAction = (
  payload = messageInputInitialAction.payload
) => actionCreator(messageInputInitialAction.type, payload);

const setMessagesAction = (payload = setMessagesInitialAction.payload) =>
  actionCreator(setMessagesInitialAction.type, payload);

const phoneNumberOnChangeAction = (
  payload = phoneNumberInitialAction.payload
) => actionCreator(phoneNumberInitialAction.type, payload);

const verificationCodeOnChangeAction = (
  payload = verificationCodeInitialAction.payload
) => actionCreator(verificationCodeInitialAction.type, payload);

const tempActions = {
  countryCodeOnChangeAction,
  countryNameOnChangeAction,
  firstNameOnChangeAction,
  lastNameOnChangeAction,
  messageInputOnChangeAction,
  phoneNumberOnChangeAction,
  selectedContactId,
  selectedCountryAction,
  setMessagesAction,
  verificationCodeOnChangeAction,
};

export { tempActions };
