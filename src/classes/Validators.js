import Validator from "fastest-validator";

import { customTypeof } from "classes/CustomTypeof";

import { errorThrower } from "functions/utilities/utilities";

const v = new Validator();

class Validators {
  constructor() {
    this.validationModel = {};
  }

  setValidationModel(validationModel) {
    this.validationModel = validationModel;
  }

  compileValidator = () => {
    try {
      errorThrower(
        !customTypeof.check(this.validationModel).type.object,
        "You must pass validationModel as a object"
      );

      return v.compile(this.validationModel);
    } catch (error) {
      logger.log("validatorCompiler catch, error:", error);
      errorThrower(error, error);
    }
  };
}

const validators = new Validators();

export { validators, Validators };

// lastNameValidator: () => {},
//     firstNameValidator: () => {},
//     usernameValidator: () => {},
//     phoneNumberValidator: () => {},
//     countryCodeValidator: () => {},
//     countryNameValidator: () => {},
//     verificationCodeValidator: () => {},
