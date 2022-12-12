import CustomTextInput from "src/components/general/input/CustomTextInput";
import withInputValidator from "src/hoc/withInputValidator";

import { variables } from "src/variables";

const LastNameInput = ({ inputValue, onInputChange, required = true }) => {
  return (
    <CustomTextInput
      id={variables.other.helper.ELEMENT_IDS.LAST_NAME}
      label={variables.other.helper.ELEMENT_LABELS.LAST_NAME}
      name={variables.other.helper.ELEMENT_NAMES.LAST_NAME}
      onChange={onInputChange}
      required={required}
      value={inputValue}
    />
  );
};

const LastName = {
  Native: LastNameInput,
  WithValidator: withInputValidator(
    LastNameInput,
    variables.other.helper.VALIDATION_KEYS.lastName
  ),
};

export default LastName;
