import { validatorManager } from "~/classes/validator/ValidatorManager";
import { ValidatorName } from "~/types";

export const createInputValidator =
  (validatorName: ValidatorName, onChangeFn: any) => (value: any) => {
    validatorManager.validators[validatorName]
      .inputValidator(value)
      .checkErrors()
      .executeIfNoError(onChangeFn);
  };
