import { trier } from "simple-trier";

import { commonTasks } from "~/classes/CommonTasks";
import { errorCheckerCollection } from "~/helpers/errorCheckerCollection";
import {
  ErrorChecker,
  NativeError,
  ValidationResult,
  ValidatorName,
  ValidatorType,
} from "~/types";
import { AutoBind } from "~/types/utils";

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
    trier(this.checkErrors.name)
      .sync()
      .try(this.tryToCheckErrors)
      .catch(this.printErrors)
      .run();

    return this;
  }

  @AutoBind
  private tryToCheckErrors() {
    if (Array.isArray(this.validationResult) && this.validationResult.length)
      this.errorChecker(this.validationResult, this.value);
    return this;
  }

  @AutoBind
  private printErrors(errors: NativeError[]) {
    commonTasks.correctErrorsAndPrint(errors);
    return this;
  }

  executeIfNoError(cb: (value: any) => void) {
    if (
      Array.isArray(this.validationResult) &&
      this.validationResult.length === 0
    ) {
      cb(this.value);
    }
  }
}

const validator = {
  create: (validatorName: ValidatorName, compiledValidator: ValidatorType) =>
    new Validator(validatorName, compiledValidator),
};

export { Validator, validator };
