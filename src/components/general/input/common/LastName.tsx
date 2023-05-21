import { Input } from "~/components/general/input";
import withInputValidator from "~/hoc/withInputValidator";

import { variables } from "~/variables";

const LastNameInput = ({ inputValue, onInputChange, required = true }) => {
  return (
    <Input.Text
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
