import { Input } from "~/components/general/input";

import withInputValidator from "~/hoc/withInputValidator";

import { variables } from "~/variables";

const CountryCodeInput = ({ inputValue, onInputChange }) => {
  return (
    <Input.Text
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
