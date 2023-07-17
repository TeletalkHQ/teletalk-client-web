import FastestValidator from "fastest-validator";

import { stuffStore } from "~/classes/StuffStore";
import {
  OnChangeValidator,
  onChangeValidator,
} from "~/classes/validator/OnChangeValidator";
import {
  SubmitValidator,
  submitValidator,
} from "~/classes/validator/SubmitValidator";
import { Field, ValidatorType } from "~/types";

const compiler = new FastestValidator({
  useNewCustomCheckerFunction: true,
});

export const validators = Object.entries(stuffStore.validationModels).reduce(
  (prevValue, [fieldName, model]) => {
    const f = fieldName as Field;

    const params: [Field, ValidatorType] = [
      f,
      compiler.compile({
        ...model,
        $$root: true,
      }),
    ];

    prevValue[f] = {
      onChangeValidator: onChangeValidator(...params),
      submitValidator: submitValidator(...params),
    };

    return prevValue;
  },
  {} as {
    [key in Field]: {
      onChangeValidator: OnChangeValidator;
      submitValidator: SubmitValidator;
    };
  }
);
