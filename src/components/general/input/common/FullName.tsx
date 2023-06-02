import { Input } from "~/components/general/input";

import { CommonOnChange } from "~/types";

interface Props {
  onFirstNameInputChange: CommonOnChange;
  onLastNameInputChange: CommonOnChange;
  firstName: string;
  lastName: string;
}

const FullName: React.FC<Props> = ({
  firstName,
  lastName,
  onFirstNameInputChange,
  onLastNameInputChange,
}) => {
  return (
    <>
      <Input.FirstName.WithValidator
        inputValue={firstName}
        onInputChange={onFirstNameInputChange}
      />
      <Input.LastName.WithValidator
        inputValue={lastName}
        onInputChange={onLastNameInputChange}
      />
    </>
  );
};

export default FullName;
