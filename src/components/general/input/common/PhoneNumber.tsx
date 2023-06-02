import { Input } from "~/components/general/input";

import withInputValidator from "~/hoc/withInputValidator";

import { CommonOnChange } from "~/types";

import { variables } from "~/variables";

interface Props {
  onChange: CommonOnChange;
  value: unknown;
}

const PhoneNumberInput: React.FC<Props> = ({ value, onChange }) => {
  return (
    <Input.Text
      autoComplete="tel-national"
      label={variables.other.helper.ELEMENT_LABELS.PHONE_NUMBER}
      name={variables.other.helper.ELEMENT_NAMES.phoneNumber}
      onChange={onChange}
      required
      style={{ marginLeft: "5px" }}
      value={value}
    />
  );
};

const PhoneNumber = {
  Native: PhoneNumberInput,
  WithValidator: withInputValidator(
    PhoneNumberInput,
    variables.other.helper.VALIDATION_KEYS.phoneNumber
  ),
};

export default PhoneNumber;
