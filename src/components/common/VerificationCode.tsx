import { GeneralInput } from "~/components/general/input";
import { OnChangeValidatorFn } from "~/types";
import { utils } from "~/utils";

interface Props {
  value: string;
  onChange: OnChangeValidatorFn;
  required?: boolean;
}

const VerificationCode: React.FC<Props> = ({ value, onChange }) => {
  const handleChange = utils.createOnChangeValidator(
    "verificationCode",
    onChange
  );

  return (
    <GeneralInput.Text
      required
      label="Verification Code"
      name="verificationCode"
      autoFocus
      value={value}
      onChange={handleChange}
    />
  );
};

export default VerificationCode;
