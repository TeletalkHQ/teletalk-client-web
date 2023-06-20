import FastestValidator, { ValidationSchema } from "fastest-validator";
import { trier } from "simple-trier";

import { Validator, validator } from "~/classes/validator/Validator";
import { stuff } from "~/data/stuff";
import { ValidatorName, ValidatorType } from "~/types";

const fastestValidatorCompiler = new FastestValidator();

type Validators = {
  [key in ValidatorName]: Validator;
};

class ValidatorManager {
  //@ts-ignore
  validators: Validators = {};

  compileValidators() {
    trier(this.compileValidators.name)
      .sync()
      .try(this.tryToCompileValidators.bind(this))
      .throw()
      .run();
  }

  private tryToCompileValidators() {
    Object.entries(stuff.validationModels).forEach(
      ([validationModelKey, validationModelValue]) => {
        const compiledValidator = this.validationModelCompiler({
          [validationModelKey]: validationModelValue,
        });

        this.createAndSetValidator(
          validationModelKey as ValidatorName,
          compiledValidator
        );
      }
    );
  }

  private validationModelCompiler(model: ValidationSchema) {
    return fastestValidatorCompiler.compile(model);
  }

  private createAndSetValidator(
    validatorName: ValidatorName,
    compiledValidator: ValidatorType
  ) {
    this.validators[validatorName] = this.createValidator(
      validatorName,
      compiledValidator
    );
    return this;
  }

  private createValidator(
    validatorName: ValidatorName,
    compiledValidator: ValidatorType
  ) {
    return validator.create(validatorName, compiledValidator);
  }
}

const validatorManager = new ValidatorManager();

validatorManager.compileValidators();

export { validatorManager, ValidatorManager };
