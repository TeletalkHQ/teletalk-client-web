import { Input } from "~/components/general/input";
import { CommonOnChange } from "~/types";

interface Props {
  value: string;
  onChange: CommonOnChange;
  required?: boolean;
}

const FirstName: React.FC<Props> = ({ value, onChange, required = true }) => {
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

export default FirstName;
