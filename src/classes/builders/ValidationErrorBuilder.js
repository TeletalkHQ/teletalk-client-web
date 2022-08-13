import { customTypeof } from "classes/CustomTypeof";

import {
  errorThrower,
  getErrorObject,
} from "functions/utilities/otherUtilities";

class ValidationErrorBuilder {
  constructor() {
    this.validationResult = [];
    this.validationResultErrorKeys = this.#getValidatorErrorTypes([]);
    this.options = {
      autoErrorDetection: true,
      extraErrorFields: {},
    };
    this.makeErrorObject = (errorObject) => {
      return getErrorObject(errorObject, {
        validationResult: this.validationResult,
        ...this.options.extraErrorFields,
      });
    };

    this.errors = [];
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
    this.validationResultErrorKeys = this.#getValidatorErrorTypes(result);
    return this;
  }
  #getValidatorErrorTypes(errorArray) {
    const validatorErrorTypes = {
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
    };

    errorArray.forEach((error) => {
      validatorErrorTypes[error.type] = true;
    });

    return validatorErrorTypes;
  }

  addError(condition, errorObject) {
    this.errors.push({ condition, errorObject });
    return this;
  }
  setRequirements(result, options = this.options) {
    this.#setValidationResult(result);
    if (customTypeof(result).type.array) this.#setValidationErrorKeys(result);
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
    this.addError(this.validationResultErrorKeys.stringEmpty, errorObject);
    return this;
  }
  required(errorObject) {
    this.addError(this.validationResultErrorKeys.required, errorObject);
    return this;
  }
  string(errorObject) {
    this.addError(this.validationResultErrorKeys.string, errorObject);
    return this;
  }
  stringNumeric(errorObject) {
    this.addError(this.validationResultErrorKeys.stringNumeric, errorObject);
    return this;
  }
  stringLength(errorObject) {
    this.addError(this.validationResultErrorKeys.stringLength, errorObject);
    return this;
  }
  stringMin(errorObject) {
    this.addError(this.validationResultErrorKeys.stringMin, errorObject);
    return this;
  }
  stringMax(errorObject) {
    this.addError(this.validationResultErrorKeys.stringMax, errorObject);
    return this;
  }
  throwAnyway(errorObject) {
    this.addError(this.validationResult !== true, errorObject);
    return this;
  }
}

const validationErrorBuilder = { create: () => new ValidationErrorBuilder() };

export { validationErrorBuilder, ValidationErrorBuilder };
