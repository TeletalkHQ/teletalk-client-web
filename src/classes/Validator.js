import { customTypeof } from "utility-store/src/classes/CustomTypeof";

import { commonTasks } from "classes/CommonTasks";

import { errorBuilders } from "helpers/errorBuilders";
import { utilities } from "utilities";

class Validator {
  constructor(compiledValidator, validatorName) {
    this.compiledValidator = compiledValidator;
    this.validatorName = validatorName;
    this.validatorErrorBuilder = this.findValidatorErrorBuilder(validatorName);
    this.validationResult = [];
  }
  #ignoredErrorTypesForInputValidator = [
    "required",
    "stringEmpty",
    "stringLength",
    "stringMin",
  ];

  findValidatorErrorBuilder() {
    return errorBuilders[`${this.validatorName}`];
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

  checkAndExecuteValidatorErrorBuilder() {
    if (this.validationResult.length)
      this.validatorErrorBuilder(this.validationResult);
  }

  printInputValidatorError() {
    try {
      this.checkAndExecuteValidatorErrorBuilder();
      return this;
    } catch (errors) {
      const fixedErrors = utilities.fixErrorBuilderErrors(errors);
      commonTasks.correctErrorsAndPrint(fixedErrors);
      return this;
    }
  }

  executeIfNoError(cb) {
    if (this.validationResult.length === 0) {
      cb();
    }
  }
}

const validator = { create: (...args) => new Validator(...args) };

export { Validator, validator };
