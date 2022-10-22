import CustomTextInput from "components/generals/inputs/CustomTextInput";
import withInputValidator from "components/hoc/withInputValidator";

import {
  ELEMENT_NAMES,
  VALIDATION_KEYS,
} from "variables/otherVariables/helpers";

const PhoneNumberInput = ({ inputValue, onInputChange }) => {
  return (
    <CustomTextInput
      autoComplete="tel-national"
      label="Phone number"
      name={ELEMENT_NAMES.PHONE_NUMBER}
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
    VALIDATION_KEYS.phoneNumber
  ),
};

export default PhoneNumber;
