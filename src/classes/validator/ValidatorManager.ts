import FastestValidator from "fastest-validator";
import { trier } from "simple-trier";

import { validator } from "src/classes/validator/Validator";

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
    Object.entries(validationModels).forEach(
      this.#processValidationModel.bind(this)
    );
  }
  #processValidationModel([validationModelKey, validationModelValue]) {
    const compiledValidator =
      this.#validationModelCompiler(validationModelValue);

    this.#createAndSetValidator(validationModelKey, compiledValidator);
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
