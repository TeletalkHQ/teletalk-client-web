import { Input } from "~/components/general/input";

import { CommonOnChange } from "~/types";

interface Props {
  value: string;
  onChange: CommonOnChange;
}

const CountryCode: React.FC<Props> = ({ value, onChange }) => {
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

export default CountryCode;
