import { Input } from "~/components/general/input";

import withInputValidator from "~/hoc/withInputValidator";

import { CommonOnChange } from "~/types";

interface Props {
  value: string;
  onChange: CommonOnChange;
  required?: boolean;
}

const FirstNameInput: React.FC<Props> = ({
  value,
  onChange,
  required = true,
}) => {
  return (
    <Input.Text
      autoFocus
      id="firstName"
      label="First Name"
      name="firstName"
      onChange={onChange}
      required={required}
      value={value}
    />
  );
};

const FirstName = {
  Native: FirstNameInput,
  WithValidator: withInputValidator(FirstNameInput, "firstName"),
};

export default FirstName;
