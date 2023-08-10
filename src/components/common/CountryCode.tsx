import { Input } from "~/components";
import Box from "~/components/general/box";
import { OnChangeValidatorFn } from "~/types";
import { utils } from "~/utils";

interface Props {
  value: string;
  onChange: OnChangeValidatorFn;
}

const CountryCode: React.FC<Props> = ({ value, onChange }) => {
  const handleChange = utils.createOnChangeValidator("countryCode", onChange);

  return (
    <Input.Text
      autoComplete="off"
      InputProps={{
        startAdornment: (
          <>
            <Box.Span>+</Box.Span>
          </>
        ),
      }}
      label="Code"
      name="countryCode"
      onChange={handleChange}
      required
      style={{ width: "90px" }}
      value={value}
    />
  );
};

export default CountryCode;
