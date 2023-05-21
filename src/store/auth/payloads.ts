import { AUTH_ACTION_TYPES } from "~/store/auth/types";

import { fields } from "~/store/fields";

const authActionPayloads = {
  [AUTH_ACTION_TYPES.COUNTRY_CODE_ONCHANGE]: {
    countryCode: fields.single.countryCode,
  },
  [AUTH_ACTION_TYPES.COUNTRY_NAME_ONCHANGE]: {
    countryName: fields.single.countryName,
  },
  [AUTH_ACTION_TYPES.FIRST_NAME_ONCHANGE]: {
    firstName: fields.single.firstName,
  },
  [AUTH_ACTION_TYPES.LAST_NAME_ONCHANGE]: {
    lastName: fields.single.lastName,
  },
  [AUTH_ACTION_TYPES.PHONE_NUMBER_ONCHANGE]: {
    phoneNumber: fields.single.phoneNumber,
  },
  [AUTH_ACTION_TYPES.SELECTED_COUNTRY_ONCHANGE]: {
    selectedCountry: fields.collection.selectedCountry,
  },
  [AUTH_ACTION_TYPES.VERIFICATION_CODE_ONCHANGE]: {
    verificationCode: fields.single.verificationCode,
  },
  [AUTH_ACTION_TYPES.RESET_AUTH_STATE]: undefined,
};

export { authActionPayloads };
