import CustomTextInput from "src/components/general/input/CustomTextInput";

import withInputValidator from "src/hoc/withInputValidator";

import { variables } from "src/variables";

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
      label={variables.other.helper.ELEMENT_LABELS.CODE}
      name={variables.other.helper.ELEMENT_NAMES.COUNTRY_CODE}
      onChange={onInputChange}
      required
      style={{ width: "90px" }}
      value={inputValue}
    />
  );
};

const CountryCode = {
  Native: CountryCodeInput,
  WithValidator: withInputValidator(
    CountryCodeInput,
    variables.other.helper.VALIDATION_KEYS.countryCode
  ),
};

export default CountryCode;
