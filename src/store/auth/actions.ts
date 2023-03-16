import { actionHandler } from "src/classes/ActionHandler";

import { AUTH_ACTION_TYPES } from "src/store/auth/types";

const selectedCountry = (payload) =>
  actionHandler(AUTH_ACTION_TYPES.SELECTED_COUNTRY_ONCHANGE, payload);

const countryCodeOnChange = (payload) =>
  actionHandler(AUTH_ACTION_TYPES.COUNTRY_CODE_ONCHANGE, payload);

const countryNameOnChange = (payload) =>
  actionHandler(AUTH_ACTION_TYPES.COUNTRY_NAME_ONCHANGE, payload);

const firstNameOnChange = (payload) =>
  actionHandler(AUTH_ACTION_TYPES.FIRST_NAME_ONCHANGE, payload);

const lastNameOnChange = (payload) =>
  actionHandler(AUTH_ACTION_TYPES.LAST_NAME_ONCHANGE, payload);

const phoneNumberOnChange = (payload) =>
  actionHandler(AUTH_ACTION_TYPES.PHONE_NUMBER_ONCHANGE, payload);

const verificationCodeOnChange = (payload) =>
  actionHandler(AUTH_ACTION_TYPES.VERIFICATION_CODE_ONCHANGE, payload);

const resetAuthState = () => actionHandler(AUTH_ACTION_TYPES.RESET_AUTH_STATE);

const authActions = {
  countryCodeOnChange,
  countryNameOnChange,
  firstNameOnChange,
  lastNameOnChange,
  phoneNumberOnChange,
  resetAuthState,
  selectedCountry,
  verificationCodeOnChange,
};

export { authActions };
