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
      <Input.FirstName value={firstName} onChange={onFirstNameInputChange} />
      <Input.LastName value={lastName} onChange={onLastNameInputChange} />
    </>
  );
};

export default FullName;
