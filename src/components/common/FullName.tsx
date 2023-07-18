import { Input } from "~/components";
import { OnChangeValidatorFn } from "~/types";

interface Props {
  onFirstNameInputChange: OnChangeValidatorFn;
  onLastNameInputChange: OnChangeValidatorFn;
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
      <Input.FirstName value={firstName} onChange={onFirstNameInputChange} />
      <Input.LastName value={lastName} onChange={onLastNameInputChange} />
    </>
  );
};

export default FullName;
