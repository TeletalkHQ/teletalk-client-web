import { trier } from "simple-trier";

import { commonTasks } from "~/classes/CommonTasks";

import { errorCheckerCollection } from "~/helpers/errorCheckerCollection";

import {
  ErrorChecker,
  ValidationResult,
  ValidatorName,
  ValidatorType,
} from "~/types";

import { utilities } from "~/utilities";

class Validator {
  private errorChecker: ErrorChecker;
  //TODO: Change Result name
  private validationResult: ValidationResult;
  private value: any;

  private ignoredErrorTypesForInputValidator = [
    "required",
    "stringEmpty",
    "stringLength",
    "stringMin",
  ];

  constructor(
    private validatorName: ValidatorName,
    private compiledValidator: ValidatorType
  ) {
    this.errorChecker = errorCheckerCollection[validatorName];
  }

  inputValidator(value: any) {
    this.value = value;

    const validationResult = this.compiledValidator({
      [this.validatorName]: value,
    });

    if (Array.isArray(validationResult)) {
      const extraIgnoreTypes: string[] = [];
      if (value === "") extraIgnoreTypes.push("stringNumeric");

      const filteredValidationResult = validationResult.filter(
        (errorItem) =>
          ![
            ...this.ignoredErrorTypesForInputValidator,
            ...extraIgnoreTypes,
          ].includes(errorItem.type)
      );

      this.validationResult = filteredValidationResult;
    } else {
      this.validationResult = [];
    }

    return this;
  }

  submitValidator(value: any) {
    const validationResult = this.compiledValidator(value);

    if (validationResult === true) this.validationResult = [];

    this.validationResult = validationResult;

    return this;
  }

  checkErrors() {
    trier(commonTasks.correctErrorsAndPrint.name)
      .sync()
      .try(this.tryToCheckErrors.bind(this))
      .catch(this.printErrors.bind(this))
      .run();

    return this;
  }

  private tryToCheckErrors() {
    if (this.validationResult.length)
      this.errorChecker(this.validationResult, this.value);
    return this;
  }

  private printErrors(error: any) {
    const fixedErrors = utilities.fixErrorBuilderErrors(error);
    commonTasks.correctErrorsAndPrint(fixedErrors);
    return this;
  }

  executeIfNoError(cb: () => void) {
    if (this.validationResult.length === 0) {
      cb();
    }
  }
}

const validator = {
  create: (validatorName: ValidatorName, compiledValidator: ValidatorType) =>
    new Validator(validatorName, compiledValidator),
};

export { Validator, validator };
