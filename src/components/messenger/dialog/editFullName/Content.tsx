import { FullName } from "utility-store/lib/types";

import { CommonInput } from "~/components/common";
import Box from "~/components/general/box";
import { OnChangeValidatorFn } from "~/types";

interface Props {
  fullName: FullName;
  onChange: OnChangeValidatorFn;
}

const EditFullNameContent: React.FC<Props> = ({ fullName, onChange }) => {
  return (
    <Box.Flex col>
      <CommonInput.FullName
        firstName={fullName.firstName}
        lastName={fullName.lastName}
        onFirstNameInputChange={onChange}
        onLastNameInputChange={onChange}
      />
    </Box.Flex>
  );
};

export default EditFullNameContent;
