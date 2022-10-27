import CustomTextInput from "components/generals/inputs/CustomTextInput";
import withInputValidator from "components/hoc/withInputValidator";

import {
  ELEMENT_NAMES,
  VALIDATION_KEYS,
} from "variables/otherVariables/helpers";

const LastNameInput = ({ inputValue, onInputChange, required = true }) => {
  return (
    <CustomTextInput
      id="lastName"
      label="Last Name"
      name={ELEMENT_NAMES.LAST_NAME}
      onChange={onInputChange}
      required={required}
      value={inputValue}
    />
  );
};

const LastName = {
  Native: LastNameInput,
  WithValidator: withInputValidator(LastNameInput, VALIDATION_KEYS.lastName),
};

export default LastName;
