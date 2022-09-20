import FastestValidator from "fastest-validator";

import { objectUtilities } from "utility-store/src/classes/ObjectUtilities";

import { validator } from "classes/Validator";

import { printCatchError } from "functions/utilities/otherUtilities";

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

  compileValidators = (validationModels) => {
    try {
      objectUtilities
        .objectEntries(validationModels)
        .forEach(this.#processValidationModel.bind(this));
    } catch (error) {
      printCatchError(this.compileValidators.name, error);
      throw error;
    }
  };
  #processValidationModel([validationModelKey, validationModelValue]) {
    const validatorName =
      this.#convertValidationModelKeyToValidatorName(validationModelKey);

    const filteredValidationModel =
      this.#filterValidationModel(validationModelValue);
    const compiledValidator = this.#validationModelCompiler(
      filteredValidationModel
    );

    this.#createAndSetValidator(validatorName, compiledValidator);
  }
  #convertValidationModelKeyToValidatorName(validationModelKey) {
    return validationModelKey.replace("ValidationModel", "Validator");
  }
  #filterValidationModel(validationModel) {
    const { version, ...restOfValidationModelProps } = validationModel;
    return restOfValidationModelProps;
  }
  #validationModelCompiler(validationModel) {
    return fastestValidatorCompiler.compile(validationModel);
  }
  #createAndSetValidator(validatorName, compiledValidator) {
    this.validators[validatorName] = this.#createValidator(
      compiledValidator,
      validatorName
    );
    return this;
  }
  #createValidator(compiledValidator, validatorName) {
    return validator.create(compiledValidator, validatorName);
  }
}

const validatorManager = new ValidatorManager();

export { validatorManager, ValidatorManager };
