import Validator from "fastest-validator";

import { commonFunctionalities } from "classes/CommonFunctionalities";
import { customTypeof } from "classes/CustomTypeof";
import { objectUtilities } from "classes/ObjectUtilities";
import { stuffStore } from "classes/StuffStore";

import {
  errorThrower,
  printCatchError,
} from "functions/utilities/otherUtilities";
import { errorBuilders } from "functions/helpers/errorBuilders";

const v = new Validator();

class ValidatorManager {
  constructor() {
    this.validators = {
      countryCodeValidator: () => {},
      countryNameValidator: () => {},
      firstNameValidator: () => {},
      lastNameValidator: () => {},
      phoneNumberValidator: () => {},
      usernameValidator: () => {},
      verificationCodeValidator: () => {},
    };
  }

  validatorCompiler(validationModel) {
    return v.compile(validationModel);
  }

  convertValidationModelKeyToValidatorKey(validationModelKey) {
    return validationModelKey.replace("ValidationModel", "Validator");
  }

  compileValidators = () => {
    try {
      const { version, ...validationModels } = stuffStore.validationModels;

      objectUtilities
        .objectEntries(validationModels)
        .forEach(this.processValidationModel.bind(this));
    } catch (error) {
      printCatchError(this.compileValidators.name, error);
      errorThrower(error, error);
    }
  };

  findValidatorErrorBuilder(validatorKey) {
    return errorBuilders[`${validatorKey}ErrorBuilder`];
  }

  makeInputValidator(compiledValidator) {
    const inputValidator = (...args) => {
      const validationResult = compiledValidator(...args);

      if (customTypeof.check(validationResult).type.array) {
        const filteredValidationResult = validationResult.filter(
          (errorItem) =>
            !["stringMin", "required", "stringEmpty"].includes(errorItem.type)
        );

        return filteredValidationResult;
      }

      return [];
    };

    return inputValidator;
  }

  makeSubmitValidator(compiledValidator) {
    const submitValidator = (...args) => {
      const validationResult = compiledValidator(...args);

      if (customTypeof.check(validationResult).type.boolean) return [];

      return validationResult;
    };

    return submitValidator;
  }

  makeValidateInputAndThrowError(inputValidator, validatorKey) {
    const validatorErrorBuilder = this.findValidatorErrorBuilder(validatorKey);

    const validateInputAndThrowError = (...args) => {
      const validationResult = inputValidator(...args);

      if (validationResult.length === 0) return;

      validatorErrorBuilder(validationResult, ...args);
    };

    return validateInputAndThrowError;
  }

  makeValidateInputAndPrintError(inputValidator, validatorKey) {
    const validatorErrorBuilder = this.findValidatorErrorBuilder(validatorKey);

    const validateInputAndPrintError = (...args) => {
      try {
        const validationResult = inputValidator(...args);

        if (validationResult.length === 0) return;

        validatorErrorBuilder(validationResult, ...args);
      } catch (errors) {
        console.log(errors);
        commonFunctionalities.correctErrorsAndPrint(errors);
      }
    };

    return validateInputAndPrintError;
  }

  setValidator(validatorKey, compiledValidator) {
    const inputValidator = this.makeInputValidator(compiledValidator);
    const submitValidator = this.makeSubmitValidator(compiledValidator);
    const validateInputAndThrowError = this.makeValidateInputAndThrowError(
      inputValidator,
      validatorKey
    );
    const validateInputAndPrintError = this.makeValidateInputAndPrintError(
      inputValidator,
      validatorKey
    );

    this.validators[validatorKey] = {
      inputValidator,
      submitValidator,
      validateInputAndPrintError,
      validateInputAndThrowError,
      validatorUniqueKey: validatorKey,
    };

    return this;
  }

  processValidationModel([validationModelKey, validationModelValue]) {
    const validatorKey =
      this.convertValidationModelKeyToValidatorKey(validationModelKey);

    const { version, ...restOfValidationModelProps } = validationModelValue;

    const compiledValidator = this.validatorCompiler(
      restOfValidationModelProps
    );

    this.setValidator(validatorKey, compiledValidator);
  }
}

const validatorManager = new ValidatorManager();

export { validatorManager, ValidatorManager };
