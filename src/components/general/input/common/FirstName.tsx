import { Input } from "~/components/general/input";
import withInputValidator from "~/hoc/withInputValidator";

import { CommonOnChange } from "~/types";

import { variables } from "~/variables";

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
      id={variables.other.helper.ELEMENT_IDS.FIRST_NAME_INPUT}
      label={variables.other.helper.ELEMENT_LABELS.FIRST_NAME}
      name={variables.other.helper.ELEMENT_NAMES.firstName}
      onChange={onChange}
      required={required}
      value={value}
    />
  );
};

const FirstName = {
  Native: FirstNameInput,
  WithValidator: withInputValidator(
    FirstNameInput,
    variables.other.helper.VALIDATION_KEYS.firstName
  ),
};

export default FirstName;
