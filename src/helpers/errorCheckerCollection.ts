import { customTypeof } from "custom-typeof";

import { stuffStore } from "~/classes/StuffStore";
import { validationChecker } from "~/classes/ValidationChecker";

import { countries } from "~/data/countries";

import { ErrorChecker, ErrorCheckerCollection } from "~/types";

import { errors } from "~/variables/notification/error";

const countryCodeErrorChecker: ErrorChecker = (
  validationResult,
  countryCode
) => {
  const errorBuilder = validationChecker(validationResult, "countryCode", {
    extraErrorFields: {
      validatedCountryCode: countryCode,
    },
  });
  errorBuilder
    .stringEmpty()
    .required()
    .string()
    .stringNumeric()
    .stringMin()
    .stringMax()
    .throwAnyway(errors.isNotACallback)
    .execute();
};

const countryNameErrorChecker: ErrorChecker = (
  validationResult,
  countryName
) => {
  const { countryNameNotSupported } = stuffStore.errors;

  const errorBuilder = validationChecker(validationResult, "countryName", {
    extraErrorFields: {
      validatedCountryName: countryName,
    },
  });

  if (validationResult === true) {
    const country = countries.find((c) => c.countryName === countryName);

    errorBuilder.addErrorChecker(
      customTypeof.isUndefined(country),
      countryNameNotSupported
    );
  }

  errorBuilder
    .required()
    .stringEmpty()
    .string()
    .stringMax()
    .stringMin()
    .throwAnyway(errors.isNotACallback)
    .execute();
};

const firstNameErrorChecker: ErrorChecker = (validationResult, firstName) => {
  validationChecker(validationResult, "firstName", {
    extraErrorFields: {
      validatedFirstName: firstName,
    },
  })
    .required()
    .stringEmpty()
    .string()
    .stringMin()
    .stringMax()
    .execute();
};

const lastNameErrorChecker: ErrorChecker = (validationResult, lastName) => {
  validationChecker(validationResult, "lastName", {
    extraErrorFields: { validatedLastName: lastName },
  })
    .string()
    .stringMax()
    .throwAnyway(errors.isNotACallback)
    .execute();
};

const phoneNumberErrorChecker: ErrorChecker = (
  validationResult,
  phoneNumber
) => {
  validationChecker(validationResult, "phoneNumber", {
    extraErrorFields: {
      validatedPhoneNumber: phoneNumber,
    },
  })
    .required()
    .stringEmpty()
    .string()
    .stringMax()
    .stringMin()
    .stringNumeric()
    .throwAnyway(errors.isNotACallback)
    .execute();
};

const userIdErrorChecker: ErrorChecker = (validationResult, userId) => {
  validationChecker(validationResult, "userId", {
    extraErrorFields: {
      validatedUserId: userId,
    },
  })
    .required()
    .stringEmpty()
    .string()
    .stringMin()
    .stringMax()
    .throwAnyway(errors.isNotACallback)
    .execute();
};

const usernameErrorChecker: ErrorChecker = (validationResult, username) => {
  validationChecker(validationResult, "username", {
    extraErrorFields: { validatedUsername: username },
  })
    .required()
    .stringEmpty()
    .string()
    .stringMin()
    .stringMax()
    .throwAnyway(errors.isNotACallback)
    .execute();
};

const verificationCodeErrorChecker: ErrorChecker = (
  validationResult,
  verificationCode
) => {
  validationChecker(validationResult, "verificationCode", {
    extraErrorFields: {
      validatedVerificationCode: verificationCode,
    },
  })
    .required()
    .stringEmpty()
    .string()
    .stringMax()
    .stringLength()
    .stringNumeric()
    .throwAnyway(errors.isNotACallback)
    .execute();
};

const errorCheckerCollection: ErrorCheckerCollection = {
  countryCode: countryCodeErrorChecker,
  countryName: countryNameErrorChecker,
  firstName: firstNameErrorChecker,
  lastName: lastNameErrorChecker,
  phoneNumber: phoneNumberErrorChecker,
  userId: userIdErrorChecker,
  username: usernameErrorChecker,
  verificationCode: verificationCodeErrorChecker,
};

export { errorCheckerCollection };
