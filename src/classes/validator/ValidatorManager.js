import FastestValidator from "fastest-validator";
import { trier } from "utility-store/src/classes/Trier";
import { objectUtilities } from "utility-store/src/classes/ObjectUtilities";

import { validator } from "src/classes/validator/Validator";

import { utilities } from "src/utilities";

const fastestValidatorCompiler = new FastestValidator();

class ValidatorManager {
  #validatorTemplate = validator.create();

  constructor() {
    this.validators = {
      countryCode: this.#validatorTemplate,
      countryName: this.#validatorTemplate,
      firstName: this.#validatorTemplate,
      lastName: this.#validatorTemplate,
      phoneNumber: this.#validatorTemplate,
      username: this.#validatorTemplate,
      verificationCode: this.#validatorTemplate,
    };
  }

  compileValidators = (validationModels) => {
    trier(this.compileValidators.name)
      .try(this.#tryToCompileValidators.bind(this), validationModels)
      .throw()
      .run();
  };
  #tryToCompileValidators(validationModels) {
    objectUtilities
      .objectEntries(validationModels)
      .forEach(this.#processValidationModel.bind(this));
  }
  #processValidationModel([validationModelKey, validationModelValue]) {
    const validationModelWithoutVersion =
      this.#excludeVersionFromValidationModel(validationModelValue);
    const compiledValidator = this.#validationModelCompiler(
      validationModelWithoutVersion
    );

    this.#createAndSetValidator(validationModelKey, compiledValidator);
  }

  #excludeVersionFromValidationModel(validationModel) {
    return utilities.excludeVersion(validationModel);
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
