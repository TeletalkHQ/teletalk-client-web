import { customTypeof } from "classes/CustomTypeof";

import {
  errorThrower,
  getErrorObject,
  getValidatorErrorTypes,
} from "functions/utilities/utilities";

class ValidationErrorBuilder {
  constructor() {
    this.validationResult = [];
    this.validationResultErrorKeys = getValidatorErrorTypes([]);
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
    this.validationResultErrorKeys = getValidatorErrorTypes(result);
    return this;
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

class ErrorBuilder {
  constructor() {
    this.errorObject = {
      description: "Default route description",
      message: "",
      errorReason: "UNKNOWN_ERROR",
      errorCode: 4000,
    };
  }

  #addProperty(key, value) {
    this.errorObject[key] = value;
  }

  build() {
    return this.errorObject;
  }

  errorCode(errorCode) {
    this.#addProperty("errorCode", errorCode);
    return this;
  }
  message(message) {
    this.#addProperty("message", message);
    return this;
  }
  errorReason(errorReason) {
    this.#addProperty("errorReason", errorReason);
    return this;
  }
  description(description) {
    this.errorObject.description = description;
    return this;
  }
}

const errorBuilder = { create: () => new ErrorBuilder() };

const validationBuilder = { create: () => new ValidationErrorBuilder() };

export {
  errorBuilder,
  ErrorBuilder,
  validationBuilder,
  ValidationErrorBuilder,
};
