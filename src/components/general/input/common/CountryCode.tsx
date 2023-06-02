import { Input } from "~/components/general/input";

import withInputValidator from "~/hoc/withInputValidator";

import { CommonOnChange } from "~/types";

interface Props {
  value: unknown;
  onChange: CommonOnChange;
}
const CountryCodeInput: React.FC<Props> = ({ value, onChange }) => {
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
      label="Code"
      name="countryCode"
      onChange={onChange}
      required
      style={{ width: "90px" }}
      value={value}
    />
  );
};

const CountryCode = {
  Native: CountryCodeInput,
  WithValidator: withInputValidator(CountryCodeInput, "countryCode"),
};

export default CountryCode;
