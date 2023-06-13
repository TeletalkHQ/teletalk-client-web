import { Input } from "~/components/general/input";

import { CommonOnChange } from "~/types";

interface Props {
  value: string;
  onChange: CommonOnChange;
  required?: boolean;
}

const LastName: React.FC<Props> = ({ value, onChange, required = true }) => {
  return (
    <Input.Text
      id="lastName"
      label="Last Name"
      name="lastName"
      onChange={onChange}
      required={required}
      value={value}
    />
  );
};

export default LastName;
