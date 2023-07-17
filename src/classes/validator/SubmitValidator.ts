import { Field, ValidatorType } from "~/types";

import { Validator } from "./Validator";

export class SubmitValidator extends Validator {
  async checkValue(value: any) {
    const validationResult = await this.compiledValidator(value);

    if (validationResult === true) this.validationResult = [];

    this.validationResult = validationResult;

    return this;
  }
}

export const submitValidator = (
  fieldName: Field,
  compiledValidator: ValidatorType
) => new SubmitValidator(fieldName, compiledValidator);
