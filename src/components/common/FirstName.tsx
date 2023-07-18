import { Input } from "~/components";
import { OnChangeValidatorFn } from "~/types";
import { utils } from "~/utils";

interface Props {
  value: string;
  onChange: OnChangeValidatorFn;
  required?: boolean;
}

const FirstName: React.FC<Props> = ({ value, onChange, required = true }) => {
  const handleChange = utils.createOnChangeValidator("firstName", onChange);

  return (
    <Input.Text
      autoFocus
      id="firstName"
      label="First Name"
      name="firstName"
      onChange={handleChange}
      required={required}
      value={value}
    />
  );
};

export default FirstName;
