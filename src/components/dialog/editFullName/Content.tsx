import { Box } from "~/components/general/box";
import { CommonInput } from "~/components/general/input/common";

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
