import { customTypeof } from "custom-typeof";
import { validationErrorBuilder } from "utility-store";

import { stuffStore } from "src/classes/StuffStore";

const countryCodeErrorChecker = (validationResult, countryCode) => {
  const errorBuilder = validationErrorBuilder.create();
  errorBuilder
    .setRequirements(
      validationResult,
      {
        extraErrorFields: {
          validatedCountryCode: countryCode,
        },
      },
      stuffStore.models.countryCode
    )
    .stringEmpty()
    .required()
    .string()
    .stringNumeric()
    .stringMin()
    .stringMax()
    .throwAnyway()
    .execute();
};

const countryNameErrorChecker = (validationResult, countryName, countries) => {
  const { COUNTRY_NAME_NOT_SUPPORTED } = stuffStore.errors;

  const errorBuilder = validationErrorBuilder.create();
  errorBuilder
    .setRequirements(
      validationResult,
      {
        extraErrorFields: {
          validatedCountryName: countryName,
        },
      },
      stuffStore.models.countryName
    )
    .customCheck(validationResult === true, () => {
      const country = countries.find((c) => c.countryName === countryName);

      errorBuilder.addError(
        customTypeof.isUndefined(country),
        COUNTRY_NAME_NOT_SUPPORTED
      );
    })
    .required()
    .stringEmpty()
    .string()
    .stringMax()
    .stringMin()
    .throwAnyway()
    .execute();
};

const firstNameErrorChecker = (validationResult, firstName) => {
  validationErrorBuilder
    .create()
    .setRequirements(
      validationResult,
      {
        extraErrorFields: {
          validatedFirstName: firstName,
        },
      },
      stuffStore.models.firstName
    )
    .required()
    .stringEmpty()
    .string()
    .stringMin()
    .stringMax()
    .execute();
};

const lastNameErrorChecker = (validationResult, lastName) => {
  validationErrorBuilder
    .create()
    .setRequirements(
      validationResult,
      {
        extraErrorFields: { validatedLastName: lastName },
      },
      stuffStore.models.lastName
    )
    .string()
    .stringMax()
    .throwAnyway()
    .execute();
};

const phoneNumberErrorChecker = (validationResult, phoneNumber) => {
  validationErrorBuilder
    .create()
    .setRequirements(
      validationResult,
      {
        extraErrorFields: {
          validatedPhoneNumber: phoneNumber,
        },
      },
      stuffStore.models.phoneNumber
    )
    .required()
    .stringEmpty()
    .string()
    .stringMax()
    .stringMin()
    .stringNumeric()
    .throwAnyway()
    .execute();
};

const userIdErrorChecker = (validationResult, userId) => {
  validationErrorBuilder
    .create()
    .setRequirements(
      validationResult,
      {
        extraErrorFields: {
          validatedUserId: userId,
        },
      },
      stuffStore.models.userId
    )
    .required()
    .stringEmpty()
    .string()
    .stringMin()
    .stringMax()
    .throwAnyway()
    .execute();
};

const usernameErrorChecker = (validationResult, username) => {
  validationErrorBuilder
    .create()
    .setRequirements(
      validationResult,
      {
        extraErrorFields: { validatedUsername: username },
      },
      stuffStore.models.username
    )
    .required()
    .stringEmpty()
    .string()
    .stringMin()
    .stringMax()
    .throwAnyway()
    .execute();
};

const verificationCodeErrorChecker = (validationResult, verificationCode) => {
  validationErrorBuilder
    .create()
    .setRequirements(
      validationResult,
      {
        extraErrorFields: {
          validatedVerificationCode: verificationCode,
        },
      },
      stuffStore.models.verificationCode
    )
    .required()
    .stringEmpty()
    .string()
    .stringMax()
    .stringLength()
    .stringNumeric()
    .throwAnyway()
    .execute();
};

const errorChecker = {
  countryCode: countryCodeErrorChecker,
  countryName: countryNameErrorChecker,
  firstName: firstNameErrorChecker,
  lastName: lastNameErrorChecker,
  phoneNumber: phoneNumberErrorChecker,
  userId: userIdErrorChecker,
  username: usernameErrorChecker,
  verificationCode: verificationCodeErrorChecker,
};

export { errorChecker };
