import CustomTextInput from "src/components/general/input/CustomTextInput";
import withInputValidator from "src/hoc/withInputValidator";

import { variables } from "src/variables";

const FirstNameInput = ({ inputValue, onInputChange, required = true }) => {
  return (
    <CustomTextInput
      autoFocus
      //TODO: Move to ELEMENT_IDS
      id="firstNameInput"
      //TODO: Move to ELEMENT_LABELS
      label="First Name"
      name={variables.other.helper.ELEMENT_NAMES.FIRST_NAME}
      onChange={onInputChange}
      required={required}
      value={inputValue}
    />
  );
};

const FirstName = {
  Native: FirstNameInput,
  WithValidator: withInputValidator(
    FirstNameInput,
    variables.other.helper.VALIDATION_KEYS.firstName
  ),
};

export default FirstName;
