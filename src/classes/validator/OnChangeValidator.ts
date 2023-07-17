import { Field, ValidatorType } from "~/types";

import { Validator } from "./Validator";

export class OnChangeValidator extends Validator {
  checkValue(value: any) {
    this.value = value;

    const validationResult = this.compiledValidator({
      [this.fieldName]: value,
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
}

export const onChangeValidator = (
  fieldName: Field,
  compiledValidator: ValidatorType
) => new OnChangeValidator(fieldName, compiledValidator);
