import { Input } from "~/components/general/input";

const FullName = ({
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
