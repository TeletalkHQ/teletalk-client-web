import { FullName } from "utility-store/lib/types";

import { Input } from "~/components";
import "~/components/common/countrySelector";
import Box from "~/components/general/box";
import { OnChangeValidatorFn } from "~/types";

interface Props {
  fullName: FullName;
  onInputChange: OnChangeValidatorFn;
}
const AddContactContent: React.FC<Props> = ({ fullName, onInputChange }) => {
  return (
    <>
      <Box.Div>
        <Box.Flex col jc="space-between" mt={2}>
          <Input.FullName
            firstName={fullName.firstName}
            lastName={fullName.lastName}
            onFirstNameInputChange={onInputChange}
            onLastNameInputChange={onInputChange}
          />
        </Box.Flex>
      </Box.Div>
    </>
  );
};

export default AddContactContent;
