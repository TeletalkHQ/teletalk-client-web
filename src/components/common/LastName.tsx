import { Input } from "~/components";
import { OnChangeValidatorFn } from "~/types";
import { utils } from "~/utils";

interface Props {
  value: string;
  onChange: OnChangeValidatorFn;
  required?: boolean;
}

const LastName: React.FC<Props> = ({ value, onChange, required }) => {
  const handleChange = utils.createOnChangeValidator("lastName", onChange);

  return (
    <Input.Text
      id="lastName"
      label="Last Name"
      name="lastName"
      onChange={handleChange}
      required={required}
      value={value}
    />
  );
};

export default LastName;
