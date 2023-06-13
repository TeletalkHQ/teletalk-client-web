import { Input } from "~/components/general/input";

import { CommonOnChange } from "~/types";

interface Props {
  onChange: CommonOnChange;
  value: unknown;
}

const PhoneNumber: React.FC<Props> = ({ value, onChange }) => {
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

export default PhoneNumber;
