import FastestValidator from "fastest-validator";

import { objectUtilities } from "utility-store/src/classes/ObjectUtilities";

import { validator } from "src/classes/Validator";

import { utilities } from "src/utilities";

const fastestValidatorCompiler = new FastestValidator();

class ValidatorManager {
  constructor() {
    this.validators = {
      countryCode: this.#defaultValidator,
      countryName: this.#defaultValidator,
      firstName: this.#defaultValidator,
      lastName: this.#defaultValidator,
      phoneNumber: this.#defaultValidator,
      username: this.#defaultValidator,
      verificationCode: this.#defaultValidator,
    };
  }
  #defaultValidator = validator.create(() => {}, "");

  compileValidators = (validationModels) => {
    //TODO: Update with Trier
    try {
      objectUtilities
        .objectEntries(validationModels)
        .forEach(this.#processValidationModel.bind(this));
    } catch (error) {
      utilities.printCatchError(this.compileValidators.name, error);
      throw error;
    }
  };
  #processValidationModel([validationModelKey, validationModelValue]) {
    const validationModelWithoutVersion =
      this.#excludeVersionFromValidationModel(validationModelValue);
    const compiledValidator = this.#validationModelCompiler(
      validationModelWithoutVersion
    );

    this.#createAndSetValidator(validationModelKey, compiledValidator);
  }

  #excludeVersionFromValidationModel(validationModel) {
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
