import CustomTextInput from "src/components/general/input/CustomTextInput";
import withInputValidator from "src/hoc/withInputValidator";

import { variables } from "src/variables";

const PhoneNumberInput = ({ inputValue, onInputChange }) => {
  return (
    <CustomTextInput
      autoComplete="tel-national"
      label="Phone number"
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
