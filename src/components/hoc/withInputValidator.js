import { validatorManager } from "classes/ValidatorManager";

const withInputValidator = (Component, validationKey) => {
  return ({ inputValue, onInputChange }) => {
    const handlePhoneNumberInputChange = (event) => {
      const { value } = event.target;
      inputValidator({
        validationKey,
        inputValue: value,
        executeIfNoError: () => onInputChange(event),
      });
    };

    return (
      <Component
        inputValue={inputValue}
        onInputChange={handlePhoneNumberInputChange}
      />
    );
  };
};

const inputValidator = ({ validationKey, inputValue, executeIfNoError }) => {
  validatorManager.validators[`${validationKey}Validator`]
    .inputValidator(validationKey, inputValue)
    .printInputValidatorError()
    .executeIfNoError(executeIfNoError);
};

export default withInputValidator;
