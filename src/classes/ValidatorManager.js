import FastestValidator from "fastest-validator";

import { objectUtilities } from "classes/ObjectUtilities";
import { stuffStore } from "classes/StuffStore";
import { validator } from "classes/Validator";

import {
  errorThrower,
  printCatchError,
} from "functions/utilities/otherUtilities";

const fastestValidatorCompiler = new FastestValidator();

class ValidatorManager {
  constructor() {
    this.validators = {
      countryCodeValidator: this.#defaultValidator,
      countryNameValidator: this.#defaultValidator,
      firstNameValidator: this.#defaultValidator,
      lastNameValidator: this.#defaultValidator,
      phoneNumberValidator: this.#defaultValidator,
      usernameValidator: this.#defaultValidator,
      verificationCodeValidator: this.#defaultValidator,
    };
  }
  #defaultValidator = validator.create(() => {}, "");

  validatorCompiler(validationModel) {
    return fastestValidatorCompiler.compile(validationModel);
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

  createAndSetValidator(validatorKey, compiledValidator) {
    this.validators[validatorKey] = validator.create(
      compiledValidator,
      validatorKey
    );

    return this;
  }

  processValidationModel([validationModelKey, validationModelValue]) {
    const validatorKey =
      this.convertValidationModelKeyToValidatorKey(validationModelKey);

    const { version, ...restOfValidationModelProps } = validationModelValue;

    const compiledValidator = this.validatorCompiler(
      restOfValidationModelProps
    );

    this.createAndSetValidator(validatorKey, compiledValidator);
  }
}

const validatorManager = new ValidatorManager();

export { validatorManager, ValidatorManager };
