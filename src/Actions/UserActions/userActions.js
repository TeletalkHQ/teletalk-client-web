import { actionCreator } from "~/Functions/Utils/actionCreator";

import {
  globalInitialActions,
  userInitialActions,
} from "~/Variables/Constants/Initials/InitialActions/initialActions";
import { tempInitialActions } from "~/Variables/Constants/Initials/InitialActions/tempInitialActions";

const {
  firstNameInitialAction,
  lastNameInitialAction,
  phoneNumberInitialAction,
  userInitialAction,
} = userInitialActions;

const {
  countryCodeInitialAction,
  countryNameInitialAction,
  verifyCodeInitialAction,
} = tempInitialActions;

const { loadingInitialAction } = globalInitialActions;

const countryCodeAction = (payload = countryCodeInitialAction.payload) =>
  actionCreator(countryCodeInitialAction.type, payload);

const countryNameAction = (payload = countryNameInitialAction.payload) =>
  actionCreator(countryNameInitialAction.type, payload);

const firstNameAction = (payload = firstNameInitialAction.payload) =>
  actionCreator(firstNameInitialAction.type, payload);

const lastNameAction = (payload = lastNameInitialAction.payload) =>
  actionCreator(lastNameInitialAction.type, payload);

const loadingAction = (payload = loadingInitialAction.payload) =>
  actionCreator(loadingInitialAction.type, payload);

const phoneNumberAction = (payload = phoneNumberInitialAction.payload) =>
  actionCreator(phoneNumberInitialAction.type, payload);

const userAction = (payload = userInitialAction.payload) =>
  actionCreator(userInitialAction.type, payload);

const verifyCodeAction = (payload = verifyCodeInitialAction.payload) =>
  actionCreator(verifyCodeInitialAction.type, payload);

export {
  countryCodeAction,
  countryNameAction,
  firstNameAction,
  lastNameAction,
  loadingAction,
  phoneNumberAction,
  userAction,
  verifyCodeAction,
};
