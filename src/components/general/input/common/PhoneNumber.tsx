import { Input } from "~/components/general/input";

import withInputValidator from "~/hoc/withInputValidator";

import { CommonOnChange } from "~/types";

interface Props {
  onChange: CommonOnChange;
  value: unknown;
}

const PhoneNumberInput: React.FC<Props> = ({ value, onChange }) => {
  return (
    <Input.Text
      autoComplete="tel-national"
      label="Phone Number"
      name="phoneNumber"
      onChange={onChange}
      required
      style={{ marginLeft: "5px" }}
      value={value}
    />
  );
};

const PhoneNumber = {
  Native: PhoneNumberInput,
  WithValidator: withInputValidator(PhoneNumberInput, "phoneNumber"),
};

export default PhoneNumber;
