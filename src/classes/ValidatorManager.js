import Validator from "fastest-validator";

import { objectUtilities } from "classes/ObjectUtilities";
import { stuffStore } from "classes/StuffStore";

import {
  errorThrower,
  printCatchError,
} from "functions/utilities/otherUtilities";

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

  setValidator(validatorKey, compiledValidator) {
    this.validators[validatorKey] = compiledValidator;
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
