import CustomTextInput from "components/generals/inputs/CustomTextInput";
import withInputValidator from "components/hoc/withInputValidator";

import {
  ELEMENT_NAMES,
  VALIDATION_KEYS,
} from "variables/otherVariables/constants";

const FirstNameInput = ({ inputValue, onInputChange, required = true }) => {
  return (
    <CustomTextInput
      autoFocus
      //TODO: Add to elementIds
      id="firstNameInput"
      label="First Name"
      name={ELEMENT_NAMES.FIRST_NAME}
      onChange={onInputChange}
      required={required}
      value={inputValue}
    />
  );
};

const FirstName = {
  Ui: FirstNameInput,
  WithValidator: withInputValidator(FirstNameInput, VALIDATION_KEYS.firstName),
};

export default FirstName;
