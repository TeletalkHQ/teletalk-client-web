import { validatorManager } from "classes/ValidatorManager";

const withInputValidator = (Component, validationKey) => {
  return ({ inputValue, onInputChange }) => {
    const handleInputChange = (event) => {
      const { value } = event.target;
      inputValidator({
        validationKey,
        inputValue: value,
        executeIfNoError: () => onInputChange(event),
      });
    };

    return (
      <Component inputValue={inputValue} onInputChange={handleInputChange} />
    );
  };
};

const inputValidator = ({ validationKey, inputValue, executeIfNoError }) => {
  validatorManager.validators[validationKey]
    .inputValidator(validationKey, inputValue)
    .printInputValidatorError()
    .executeIfNoError(executeIfNoError);
};

export default withInputValidator;
