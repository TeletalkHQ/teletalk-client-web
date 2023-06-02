import { Input } from "~/components/general/input";

import withInputValidator from "~/hoc/withInputValidator";

import { CommonOnChange } from "~/types";

interface Props {
  value: string;
  onChange: CommonOnChange;
  required?: boolean;
}

const LastNameInput: React.FC<Props> = ({
  value,
  onChange,
  required = true,
}) => {
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

const LastName = {
  Native: LastNameInput,
  WithValidator: withInputValidator(LastNameInput, "lastName"),
};

export default LastName;
