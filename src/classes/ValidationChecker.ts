import { ValidationError } from "fastest-validator";
import { errorThrower } from "utility-store";

import { errors } from "~/variables/notification/error";

interface Options {
  extraErrorFields: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [prop: string]: any;
  };
}

const getDefaultValidatorErrorTypes = () => ({
  array: false,
  arrayContains: false,
  arrayEmpty: false,
  arrayEnum: false,
  arrayLength: false,
  arrayMax: false,
  arrayMin: false,
  arrayUnique: false,
  boolean: false,
  date: false,
  dateMax: false,
  dateMin: false,
  email: false,
  emailEmpty: false,
  emailMax: false,
  emailMin: false,
  enumValue: false,
  equalField: false,
  equalValue: false,
  forbidden: false,
  function: false,
  luhn: false,
  mac: false,
  number: false,
  numberEqual: false,
  numberInteger: false,
  numberMax: false,
  numberMin: false,
  numberNegative: false,
  numberNotEqual: false,
  numberPositive: false,
  object: false,
  objectMaxProps: false,
  objectMinProps: false,
  objectStrict: false,
  required: false,
  string: false,
  stringAlpha: false,
  stringAlphadash: false,
  stringAlphanum: false,
  stringBase64: false,
  stringContains: false,
  stringEmpty: false,
  stringEnum: false,
  stringHex: false,
  stringLength: false,
  stringMax: false,
  stringMin: false,
  stringNumeric: false,
  stringPattern: false,
  stringSingleLine: false,
  tuple: false,
  tupleEmpty: false,
  tupleLength: false,
  url: false,
  uuid: false,
  uuidVersion: false,
});

const ERROR_TYPES = getDefaultValidatorErrorTypes();
type ErrorTypes = typeof ERROR_TYPES;
type ValidationErrors = ValidationError[];
type ValidationResult = true | ValidationErrors;

class ValidationChecker {
  private errorCheckers: {
    condition: boolean;
  }[] = [];

  private occurredErrors: ErrorTypes;

  constructor(
    private validationResult: ValidationResult,
    public options: Partial<Options> = {}
  ) {}

  getOptions() {
    return this.options;
  }
  setOptions(newOptions: Partial<Options> = this.getOptions()) {
    const oldOptions = this.getOptions();
    this.options = {
      ...oldOptions,
      ...newOptions,
    };
    return this;
  }

  addExtraErrorFields(fields = {}) {
    this.setOptions({
      extraErrorFields: {
        ...this.getOptions().extraErrorFields,
        ...fields,
      },
    });

    return this;
  }

  check(cb: (this: ValidationChecker) => void) {
    if (this.validationResult === true) return;

    this.occurredErrors = this.checkOccurredErrors(this.validationResult);
    cb.call(this);
    this.execute();
  }

  stringEmpty() {
    this.addErrorChecker(this.occurredErrors.stringEmpty);
    return this;
  }
  required() {
    this.addErrorChecker(this.occurredErrors.required);
    return this;
  }
  string() {
    this.addErrorChecker(this.occurredErrors.string);
    return this;
  }
  stringNumeric() {
    this.addErrorChecker(this.occurredErrors.stringNumeric);
    return this;
  }
  stringLength() {
    this.addErrorChecker(this.occurredErrors.stringLength);
    return this;
  }
  stringMin() {
    this.addErrorChecker(this.occurredErrors.stringMin);
    return this;
  }
  stringMax() {
    this.addErrorChecker(this.occurredErrors.stringMax);
    return this;
  }
  throwAnyway() {
    this.addErrorChecker(true);
    return this;
  }

  addErrorChecker(condition: boolean) {
    this.errorCheckers.push({
      condition,
    });

    return this;
  }

  private execute() {
    for (const item of this.errorCheckers) {
      errorThrower(
        item.condition,
        this.extractNativeErrorsFromValidationResult()
      );
    }
  }

  private extractNativeErrorsFromValidationResult() {
    return (this.validationResult as ValidationErrors).reduce((prev, curr) => {
      prev.push({
        ...errors[curr.message],
        ...this.getOptions().extraErrorFields,
      });
      return prev;
    }, [] as ValidationErrors[]);
  }

  checkOccurredErrors = (errors: ValidationErrors) => {
    const validatorErrorTypes = getDefaultValidatorErrorTypes();

    errors.forEach((error) => {
      validatorErrorTypes[error.type as keyof ErrorTypes] = true;
    });

    return validatorErrorTypes;
  };
}

const validationChecker = (
  validationResult: ValidationResult,
  options?: Partial<Options>
) => new ValidationChecker(validationResult, options);

export {
  type ValidationErrors,
  type ErrorTypes,
  type Options,
  type ValidationResult,
  validationChecker,
  ValidationChecker,
};
