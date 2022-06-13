import { actionCreator } from "~/functions/utils/actionCreator";
import { onlineStatusInitialAction } from "~/variables/constants/initials/initialActions/globalInitialActions";
import { tempInitialActions } from "~/variables/constants/initials/initialActions/tempInitialActions";

const {
  contactSelectedInitialAction,
  messageInputInitialAction,
  setMessagesInitialAction,
  countryCodeInitialAction,
  countryNameInitialAction,
  verifyCodeInitialAction,
  phoneNumberInitialAction,
  firstNameInitialAction,
  lastNameInitialAction,
} = tempInitialActions;

const contactClickAction = (payload = contactSelectedInitialAction.payload) =>
  actionCreator(contactSelectedInitialAction.type, payload);

const countryCodeAction = (payload = countryCodeInitialAction.payload) =>
  actionCreator(countryCodeInitialAction.type, payload);

const countryNameAction = (payload = countryNameInitialAction.payload) =>
  actionCreator(countryNameInitialAction.type, payload);

const firstNameAction = (payload = firstNameInitialAction.payload) =>
  actionCreator(firstNameInitialAction.type, payload);

const lastNameAction = (payload = lastNameInitialAction.payload) =>
  actionCreator(lastNameInitialAction.type, payload);

const messageInputOnChangeAction = (
  payload = messageInputInitialAction.payload
) => actionCreator(messageInputInitialAction.type, payload);

const onlineStatusOnChange = (payload = onlineStatusInitialAction.payload) =>
  actionCreator(tempInitialActions.onlineStatusInitialAction.type, payload);

const setMessagesAction = (payload = setMessagesInitialAction.payload) =>
  actionCreator(setMessagesInitialAction.type, payload);

const phoneNumberAction = (payload = phoneNumberInitialAction.payload) =>
  actionCreator(phoneNumberInitialAction.type, payload);

const verifyCodeAction = (payload = verifyCodeInitialAction.payload) =>
  actionCreator(verifyCodeInitialAction.type, payload);

const tempActions = {
  contactClickAction,
  countryCodeAction,
  countryNameAction,
  firstNameAction,
  lastNameAction,
  messageInputOnChangeAction,
  onlineStatusOnChange,
  phoneNumberAction,
  setMessagesAction,
  verifyCodeAction,
};

export {
  contactClickAction,
  countryCodeAction,
  countryNameAction,
  firstNameAction,
  lastNameAction,
  messageInputOnChangeAction,
  onlineStatusOnChange,
  phoneNumberAction,
  setMessagesAction,
  verifyCodeAction,
  tempActions,
};
