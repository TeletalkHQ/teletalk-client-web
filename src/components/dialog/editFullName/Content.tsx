import { Box } from "src/components/general/box";
import { CommonInput } from "src/components/general/input/common";

const EditFullNameContent = ({ fullName, onInputChange }) => {
  return (
    <Box.Flex col>
      <CommonInput.FullName
        firstName={fullName.firstName}
        lastName={fullName.lastName}
        onFirstNameInputChange={onInputChange}
        onLastNameInputChange={onInputChange}
      />
    </Box.Flex>
  );
};

export default EditFullNameContent;
