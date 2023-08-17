import { FullName } from "utility-store/lib/types";

import { Input } from "~/components";
import "~/components/common/countrySelector";
import Box from "~/components/general/box";
import { OnChangeValidatorFn } from "~/types";

interface Props {
  fullName: FullName;
  onChange: OnChangeValidatorFn;
}
const EditContactWithCellphoneContent: React.FC<Props> = ({
  fullName,
  onChange,
}) => {
  return (
    <>
      <Box.Div>
        <Box.Flex col jc="space-between" mt={2}>
          <Input.FullName
            firstName={fullName.firstName}
            lastName={fullName.lastName}
            onFirstNameInputChange={onChange}
            onLastNameInputChange={onChange}
          />
        </Box.Flex>
      </Box.Div>
    </>
  );
};

export default EditContactWithCellphoneContent;
