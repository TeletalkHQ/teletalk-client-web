import { Input } from "~/components/general/input";

import withInputValidator from "~/hoc/withInputValidator";

import { CommonOnChange } from "~/types";

import { variables } from "~/variables";

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
      id={variables.other.helper.ELEMENT_IDS.LAST_NAME}
      label={variables.other.helper.ELEMENT_LABELS.LAST_NAME}
      name={variables.other.helper.ELEMENT_NAMES.lastName}
      onChange={onChange}
      required={required}
      value={value}
    />
  );
};

const LastName = {
  Native: LastNameInput,
  WithValidator: withInputValidator(
    LastNameInput,
    variables.other.helper.VALIDATION_KEYS.lastName
  ),
};

export default LastName;
