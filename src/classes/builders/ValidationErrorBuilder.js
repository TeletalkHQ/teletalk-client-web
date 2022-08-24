import { arrayUtilities } from "classes/ArrayUtilities";
import { customTypeof } from "classes/CustomTypeof";

import {
  errorThrower,
  getErrorObject,
} from "functions/utilities/otherUtilities";

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

class ValidationErrorBuilder {
  constructor() {
    this.validationResult = [];
    this.validationResultErrorTypes = this.#convertValidatorErrorTypesToBoolean(
      []
    );
    this.options = {
      autoErrorDetection: true,
      extraErrorFields: {},
    };

    this.errors = [];
  }
  makeErrorObject(errorObject) {
    return getErrorObject(errorObject, {
      validationResult: this.validationResult,
      ...this.options.extraErrorFields,
    });
  }

  #setOptions(options = this.options) {
    this.options = {
      ...this.options,
      ...options,
    };
    return this;
  }
  #setValidationResult(result) {
    this.validationResult = result;
    return this;
  }
  #setValidationErrorKeys(result) {
    this.validationResultErrorTypes =
      this.#convertValidatorErrorTypesToBoolean(result);
    return this;
  }
  #convertValidatorErrorTypesToBoolean(errorArray) {
    const validatorErrorTypes = getDefaultValidatorErrorTypes();

    errorArray.forEach((error) => {
      validatorErrorTypes[error.type] = true;
    });

    return validatorErrorTypes;
  }

  addError(condition, errorObject) {
    this.errors = arrayUtilities.pushNewItems(this.errors, {
      condition,
      errorObject,
    });

    return this;
  }
  setRequirements(validationResult, options = this.options) {
    this.#setValidationResult(validationResult);
    if (customTypeof.check(validationResult).type.array)
      this.#setValidationErrorKeys(validationResult);
    this.#setOptions(options);

    return this;
  }
  execute() {
    for (const error of this.errors) {
      const { condition, errorObject } = error;

      errorThrower(condition, () => this.makeErrorObject(errorObject));
    }
  }
  addExtraErrorFields(fields = {}) {
    this.#setOptions({
      extraErrorFields: {
        ...this.options.extraErrorFields,
        ...fields,
      },
    });

    return this;
  }

  customCheck(condition, cb) {
    if (condition) cb();
    return this;
  }

  stringEmpty(errorObject) {
    this.addError(this.validationResultErrorTypes.stringEmpty, errorObject);
    return this;
  }
  required(errorObject) {
    this.addError(this.validationResultErrorTypes.required, errorObject);
    return this;
  }
  string(errorObject) {
    this.addError(this.validationResultErrorTypes.string, errorObject);
    return this;
  }
  stringNumeric(errorObject) {
    this.addError(this.validationResultErrorTypes.stringNumeric, errorObject);
    return this;
  }
  stringLength(errorObject) {
    this.addError(this.validationResultErrorTypes.stringLength, errorObject);
    return this;
  }
  stringMin(errorObject) {
    this.addError(this.validationResultErrorTypes.stringMin, errorObject);
    return this;
  }
  stringMax(errorObject) {
    this.addError(this.validationResultErrorTypes.stringMax, errorObject);
    return this;
  }
  throwAnyway(errorObject) {
    this.addError(this.validationResult !== true, errorObject);
    return this;
  }
}

const validationErrorBuilder = { create: () => new ValidationErrorBuilder() };

export { validationErrorBuilder, ValidationErrorBuilder };
