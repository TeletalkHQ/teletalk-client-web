import { validationErrorBuilder } from "utility-store/src/classes/ValidationErrorBuilder";

import { stuffStore } from "classes/StuffStore";

const countryCodeValidatorErrorBuilder = (validationResult, countryCode) => {
  const {
    COUNTRY_CODE_INVALID,
    COUNTRY_CODE_INVALID_TYPE,
    COUNTRY_CODE_MAXLENGTH_REACH,
    COUNTRY_CODE_MINLENGTH_REACH,
    COUNTRY_CODE_NUMERIC,
    COUNTRY_CODE_REQUIRED,
  } = stuffStore.errors;

  const errorBuilder = validationErrorBuilder.create();
  errorBuilder
    .setRequirements(validationResult, {
      extraErrorFields: {
        validatedCountryCode: countryCode,
      },
    })
    .stringEmpty(COUNTRY_CODE_REQUIRED)
    .required(COUNTRY_CODE_REQUIRED)
    .string(COUNTRY_CODE_INVALID_TYPE)
    .stringNumeric(COUNTRY_CODE_NUMERIC)
    .stringMin(COUNTRY_CODE_MINLENGTH_REACH)
    .stringMax(COUNTRY_CODE_MAXLENGTH_REACH)
    .throwAnyway(COUNTRY_CODE_INVALID)
    .execute();
};

const countryNameValidatorErrorBuilder = (
  validationResult,
  countryName,
  countries
) => {
  const {
    COUNTRY_NAME_INVALID,
    COUNTRY_NAME_INVALID_TYPE,
    COUNTRY_NAME_MAXLENGTH_REACH,
    COUNTRY_NAME_MINLENGTH_REACH,
    COUNTRY_NAME_NOT_SUPPORTED,
    COUNTRY_NAME_REQUIRED,
  } = stuffStore.errors;

  const errorBuilder = validationErrorBuilder.create();
  errorBuilder
    .setRequirements(validationResult, {
      extraErrorFields: {
        validatedCountryName: countryName,
      },
    })
    .customCheck(validationResult === true, () => {
      const country = countries.find((c) => c.countryName === countryName);

      errorBuilder.addError(country === undefined, COUNTRY_NAME_NOT_SUPPORTED);
    })
    .required(COUNTRY_NAME_REQUIRED)
    .stringEmpty(COUNTRY_NAME_REQUIRED)
    .string(COUNTRY_NAME_INVALID_TYPE)
    .stringMax(COUNTRY_NAME_MAXLENGTH_REACH)
    .stringMin(COUNTRY_NAME_MINLENGTH_REACH)
    .throwAnyway(COUNTRY_NAME_INVALID)
    .execute();
};

const firstNameValidatorErrorBuilder = (validationResult, firstName) => {
  const {
    FIRST_NAME_INVALID_TYPE,
    FIRST_NAME_MAXLENGTH_REACH,
    FIRST_NAME_MINLENGTH_REACH,
    FIRST_NAME_REQUIRED,
  } = stuffStore.errors;

  validationErrorBuilder
    .create()
    .setRequirements(validationResult, {
      extraErrorFields: {
        validatedFirstName: firstName,
      },
    })
    .required(FIRST_NAME_REQUIRED)
    .stringEmpty(FIRST_NAME_REQUIRED)
    .string(FIRST_NAME_INVALID_TYPE)
    .stringMin(FIRST_NAME_MINLENGTH_REACH)
    .stringMax(FIRST_NAME_MAXLENGTH_REACH)
    .execute();
};

const lastNameValidatorErrorBuilder = (validationResult, lastName) => {
  const {
    LAST_NAME_INVALID,
    LAST_NAME_INVALID_TYPE,
    LAST_NAME_MAXLENGTH_REACH,
  } = stuffStore.errors;

  validationErrorBuilder
    .create()
    .setRequirements(validationResult, {
      extraErrorFields: { validatedLastName: lastName },
    })
    .string(LAST_NAME_INVALID_TYPE)
    .stringMax(LAST_NAME_MAXLENGTH_REACH)
    .throwAnyway(LAST_NAME_INVALID)
    .execute();
};

const phoneNumberValidatorErrorBuilder = (validationResult, phoneNumber) => {
  const {
    PHONE_NUMBER_INVALID,
    PHONE_NUMBER_INVALID_TYPE,
    PHONE_NUMBER_MAXLENGTH_REACH,
    PHONE_NUMBER_MINLENGTH_REACH,
    PHONE_NUMBER_NUMERIC,
    PHONE_NUMBER_REQUIRED,
  } = stuffStore.errors;

  validationErrorBuilder
    .create()
    .setRequirements(validationResult, {
      extraErrorFields: {
        validatedPhoneNumber: phoneNumber,
      },
    })
    .required(PHONE_NUMBER_REQUIRED)
    .stringEmpty(PHONE_NUMBER_REQUIRED)
    .string(PHONE_NUMBER_INVALID_TYPE)
    .stringMax(PHONE_NUMBER_MAXLENGTH_REACH)
    .stringMin(PHONE_NUMBER_MINLENGTH_REACH)
    .stringNumeric(PHONE_NUMBER_NUMERIC)
    .throwAnyway(PHONE_NUMBER_INVALID)
    .execute();
};

const userIdValidatorErrorBuilder = (validationResult, userId) => {
  const {
    PRIVATE_ID_INVALID,
    PRIVATE_ID_INVALID_TYPE,
    PRIVATE_ID_MAX_LENGTH_REACH,
    PRIVATE_ID_MIN_LENGTH_REACH,
    PRIVATE_ID_REQUIRED,
  } = stuffStore.errors;

  validationErrorBuilder
    .create()
    .setRequirements(validationResult, {
      extraErrorFields: {
        validatedUserId: userId,
      },
    })
    .required(PRIVATE_ID_REQUIRED)
    .stringEmpty(PRIVATE_ID_REQUIRED)
    .string(PRIVATE_ID_INVALID_TYPE)
    .stringMin(PRIVATE_ID_MIN_LENGTH_REACH)
    .stringMax(PRIVATE_ID_MAX_LENGTH_REACH)
    .throwAnyway(PRIVATE_ID_INVALID)
    .execute();
};

const usernameValidatorErrorBuilder = (validationResult, username) => {
  const {
    USERNAME_INVALID,
    USERNAME_INVALID_TYPE,
    USERNAME_MAXLENGTH_REACH,
    USERNAME_MINLENGTH_REACH,
    USERNAME_REQUIRED,
  } = stuffStore.errors;

  validationErrorBuilder
    .create()
    .setRequirements(validationResult, {
      extraErrorFields: { validatedUsername: username },
    })
    .required(USERNAME_REQUIRED)
    .stringEmpty(USERNAME_REQUIRED)
    .string(USERNAME_INVALID_TYPE)
    .stringMin(USERNAME_MINLENGTH_REACH)
    .stringMax(USERNAME_MAXLENGTH_REACH)
    .throwAnyway(USERNAME_INVALID)
    .execute();
};

const verificationCodeValidatorErrorBuilder = (
  validationResult,
  verificationCode
) => {
  const {
    VERIFICATION_CODE_INVALID,
    VERIFICATION_CODE_INVALID_LENGTH,
    VERIFICATION_CODE_INVALID_TYPE,
    VERIFICATION_CODE_MAXLENGTH_REACH,
    VERIFICATION_CODE_NUMERIC,
    VERIFICATION_CODE_REQUIRED,
  } = stuffStore.errors;
  validationErrorBuilder
    .create()
    .setRequirements(validationResult, {
      extraErrorFields: {
        validatedVerificationCode: verificationCode,
      },
    })
    .required(VERIFICATION_CODE_REQUIRED)
    .stringEmpty(VERIFICATION_CODE_REQUIRED)
    .string(VERIFICATION_CODE_INVALID_TYPE)
    .stringMax(VERIFICATION_CODE_MAXLENGTH_REACH)
    .stringLength(VERIFICATION_CODE_INVALID_LENGTH)
    .stringNumeric(VERIFICATION_CODE_NUMERIC)
    .throwAnyway(VERIFICATION_CODE_INVALID)
    .execute();
};

const errorBuilders = {
  countryCode: countryCodeValidatorErrorBuilder,
  countryName: countryNameValidatorErrorBuilder,
  firstName: firstNameValidatorErrorBuilder,
  lastName: lastNameValidatorErrorBuilder,
  phoneNumber: phoneNumberValidatorErrorBuilder,
  userId: userIdValidatorErrorBuilder,
  username: usernameValidatorErrorBuilder,
  verificationCode: verificationCodeValidatorErrorBuilder,
};

export { errorBuilders };
