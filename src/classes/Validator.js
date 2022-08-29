import { customTypeof } from "utility-store/src/classes/CustomTypeof";

import { commonFunctionalities } from "classes/CommonFunctionalities";

import { errorBuilders } from "functions/helpers/errorBuilders";

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
    return errorBuilders[`${this.validatorName}ErrorBuilder`];
  }

  inputValidator(validatorParam, validationValue) {
    const validationResult = this.compiledValidator(validatorParam);

    if (customTypeof.check(validationResult).type.isArray) {
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

  throwError() {
    if (this.validationResult.length)
      this.validatorErrorBuilder(this.validationResult);
  }

  printError() {
    try {
      this.throwError();
    } catch (errors) {
      console.log(errors);
      commonFunctionalities.correctErrorsAndPrint(errors);
    } finally {
      return this;
    }
  }

  execute(cb) {
    if (this.validationResult.length === 0) {
      cb();
    }
  }
}

const validator = { create: (...args) => new Validator(...args) };

export { Validator, validator };
