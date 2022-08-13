import Validator from "fastest-validator";

import { errorThrower } from "functions/utilities/otherUtilities";
import { objectUtilities } from "./ObjectUtilities";
import { stuffStore } from "./StuffStore";

const v = new Validator();

class ValidatorManager {
  constructor() {
    this.validators = {
      countryCodeValidator: () => {},
      countryNameValidator: () => {},
      firstNameValidator: () => {},
      lastNameValidator: () => {},
      phoneNumberValidator: () => {},
      usernameValidator: () => {},
      verificationCodeValidator: () => {},
    };
  }

  validatorCompiler(validationModel) {
    return v.compile(validationModel);
  }

  compileValidators = () => {
    try {
      const { version, ...validationModels } = stuffStore.validationModels;

      objectUtilities
        .objectEntries(validationModels)
        .forEach(([validationModelKey, validationModelValue]) => {
          const keyWithoutValidationModelWord =
            validationModelKey.split("ValidationModel")[0];
          const validatorKey = `${keyWithoutValidationModelWord}Validator`;

          const { version, ...validationModelWithoutVersion } =
            validationModelValue;

          const compiledValidator = this.validatorCompiler(
            validationModelWithoutVersion
          );

          this.validators[validatorKey] = compiledValidator;
        });
    } catch (error) {
      logger.log("validatorCompiler catch, error:", error);
      errorThrower(error, error);
    }
  };
}

const validatorManager = new ValidatorManager();

export { validatorManager, ValidatorManager };
