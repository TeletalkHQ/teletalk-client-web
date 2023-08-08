import { OnChangeValidatorFn } from "~/types";
import { utils } from "~/utils";

import { GeneralInput } from "../general/input";
import InputAdornment from "../general/other/InputAdornment";

interface Props {
  value: string;
  onChange: OnChangeValidatorFn;
  required?: boolean;
}

const Username: React.FC<Props> = ({ value, onChange }) => {
  const handleChange = utils.createOnChangeValidator("username", onChange);

  return (
    <GeneralInput.Text
      autoFocus
      name="username"
      label="Username"
      onChange={handleChange}
      value={value}
      InputProps={{
        startAdornment: <InputAdornment position="start">@</InputAdornment>,
      }}
    />
  );
};

export default Username;
