import { customTypeof } from "custom-typeof";

import { stuffStore } from "~/classes/StuffStore";
import { validationChecker } from "~/classes/ValidationChecker";

import { countries } from "~/data/countries";

import { ErrorChecker, ErrorCheckerCollection } from "~/types";

const countryCodeErrorChecker: ErrorChecker = (
  validationResult,
  countryCode
) => {
  if (validationResult === true) {
    const country = countries.find((c) => c.countryCode === countryCode);
    if (customTypeof.isUndefined(country))
      throw stuffStore.errors.countryCodeNotSupported;
  }

  const errorChecker = validationChecker(validationResult, {
    extraErrorFields: {
      validatedCountryCode: countryCode,
    },
  });

  errorChecker.check(function () {
    this.stringEmpty()
      .required()
      .string()
      .stringMin()
      .stringMax()
      .stringNumeric()
      .throwAnyway();
  });
};

const countryNameErrorChecker: ErrorChecker = (
  validationResult,
  countryName
) => {
  if (validationResult === true) {
    const country = countries.find((c) => c.countryName === countryName);
    if (customTypeof.isUndefined(country))
      throw stuffStore.errors.countryNameNotSupported;
  }

  const errorChecker = validationChecker(validationResult, {
    extraErrorFields: {
      validatedCountryName: countryName,
    },
  });

  errorChecker.check(function () {
    this.required()
      .stringEmpty()
      .string()
      .stringMax()
      .stringMin()
      .throwAnyway();
  });
};

const firstNameErrorChecker: ErrorChecker = (validationResult, firstName) => {
  validationChecker(validationResult, {
    extraErrorFields: {
      validatedFirstName: firstName,
    },
  }).check(function () {
    this.required().stringEmpty().string().stringMin().stringMax();
  });
};

const lastNameErrorChecker: ErrorChecker = (validationResult, lastName) => {
  validationChecker(validationResult, {
    extraErrorFields: { validatedLastName: lastName },
  }).check(function () {
    this.string().stringMax().throwAnyway();
  });
};

const phoneNumberErrorChecker: ErrorChecker = (
  validationResult,
  phoneNumber
) => {
  validationChecker(validationResult, {
    extraErrorFields: {
      validatedPhoneNumber: phoneNumber,
    },
  }).check(function () {
    this.required()
      .stringEmpty()
      .string()
      .stringMax()
      .stringMin()
      .stringNumeric()
      .throwAnyway();
  });
};

const userIdErrorChecker: ErrorChecker = (validationResult, userId) => {
  validationChecker(validationResult, {
    extraErrorFields: {
      validatedUserId: userId,
    },
  }).check(function () {
    this.required()
      .stringEmpty()
      .string()
      .stringMin()
      .stringMax()
      .throwAnyway();
  });
};

const usernameErrorChecker: ErrorChecker = (validationResult, username) => {
  validationChecker(validationResult, {
    extraErrorFields: { validatedUsername: username },
  }).check(function () {
    this.required()
      .stringEmpty()
      .string()
      .stringMin()
      .stringMax()
      .throwAnyway();
  });
};

const verificationCodeErrorChecker: ErrorChecker = (
  validationResult,
  verificationCode
) => {
  validationChecker(validationResult, {
    extraErrorFields: {
      validatedVerificationCode: verificationCode,
    },
  }).check(function () {
    this.required()
      .stringEmpty()
      .string()
      .stringMax()
      .stringLength()
      .stringNumeric()
      .throwAnyway();
  });
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
