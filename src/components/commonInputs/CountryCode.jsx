import CustomTextInput from "components/generals/inputs/CustomTextInput";
import withInputValidator from "components/hoc/withInputValidator";

import {
  ELEMENT_NAMES,
  VALIDATION_KEYS,
} from "variables/otherVariables/constants";

const CountryCodeInput = ({ inputValue, onInputChange }) => {
  return (
    <CustomTextInput
      autoComplete="off"
      InputProps={{
        startAdornment: (
          <>
            <span>+</span>
          </>
        ),
      }}
      label="Code"
      name={ELEMENT_NAMES.COUNTRY_CODE}
      onChange={onInputChange}
      required
      style={{ width: "90px" }}
      value={inputValue}
    />
  );
};

const CountryCode = {
  Ui: CountryCodeInput,
  WithValidator: withInputValidator(
    CountryCodeInput,
    VALIDATION_KEYS.countryCode
  ),
};

export default CountryCode;
