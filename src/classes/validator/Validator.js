import { customTypeof } from "custom-typeof";
import { trier } from "utility-store/src/classes/Trier";

import { commonTasks } from "src/classes/CommonTasks";

import { errorChecker } from "src/helpers/errorChecker";

import { utilities } from "src/utilities";

class Validator {
  #ignoredErrorTypesForInputValidator = [
    "required",
    "stringEmpty",
    "stringLength",
    "stringMin",
  ];

  constructor(compiledValidator, validatorName) {
    this.compiledValidator = compiledValidator;
    this.validatorErrorBuilder = errorChecker[`${validatorName}`];
    this.validationResult = [];
  }

  inputValidator(validationKey, validationValue) {
    const validationResult = this.compiledValidator({
      [validationKey]: validationValue,
    });

    if (customTypeof.isArray(validationResult)) {
      const extraIgnoreTypes = [];
      if (validationValue === "") extraIgnoreTypes.push("stringNumeric");

      const filteredValidationResult = validationResult.filter(
        (errorItem) =>
          ![
            ...this.#ignoredErrorTypesForInputValidator,
            ...extraIgnoreTypes,
          ].includes(errorItem.type)
      );

      this.validationResult = filteredValidationResult;
    } else {
      this.validationResult = [];
    }

    return this;
  }

  submitValidator(validatorParam) {
    const validationResult = this.compiledValidator(validatorParam);

    if (validationResult === true) this.validationResult = [];

    this.validationResult = validationResult;

    return this;
  }

  printInputValidatorError() {
    return trier(this.correctErrorsAndPrint)
      .try(this.#tryToCheckErrors.bind(this))

      .catch(this.#catchCheckErrors.bind(this))
      .run();
  }
  #tryToCheckErrors() {
    if (this.validationResult.length)
      //FIXME validatedXXX is undefined
      this.validatorErrorBuilder(this.validationResult);
    return this;
  }
  #catchCheckErrors(error) {
    const fixedErrors = utilities.fixErrorBuilderErrors(error);
    commonTasks.correctErrorsAndPrint(fixedErrors);
    return this;
  }

  executeIfNoError(cb) {
    if (this.validationResult.length === 0) {
      cb();
    }
  }
}

const validator = { create: (...args) => new Validator(...args) };

export { Validator, validator };
