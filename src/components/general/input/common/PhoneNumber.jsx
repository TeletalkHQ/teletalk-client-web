import { Input } from "src/components/general/input";
import withInputValidator from "src/hoc/withInputValidator";

import { variables } from "src/variables";

const PhoneNumberInput = ({ inputValue, onInputChange }) => {
  return (
    <Input.Text
      autoComplete="tel-national"
      label={variables.other.helper.ELEMENT_LABELS.PHONE_NUMBER}
      name={variables.other.helper.ELEMENT_NAMES.PHONE_NUMBER}
      onChange={onInputChange}
      required
      style={{ marginLeft: "5px" }}
      value={inputValue}
    />
  );
};

const PhoneNumber = {
  Native: PhoneNumberInput,
  WithValidator: withInputValidator(
    PhoneNumberInput,
    variables.other.helper.VALIDATION_KEYS.phoneNumber
  ),
};

export default PhoneNumber;
