import { FullName } from "utility-store/lib/types";

import { Input } from "~/components";
import Box from "~/components/general/box";
import { OnChangeValidatorFn } from "~/types";

interface Props {
  contact: FullName;
  onChange: OnChangeValidatorFn;
}

const Content: React.FC<Props> = ({ contact, onChange }) => {
  return (
    <>
      <Box.Div>
        <Box.Flex col jc="space-between" mt={2}>
          <Input.FullName
            firstName={contact.firstName}
            lastName={contact.lastName}
            onFirstNameInputChange={onChange}
            onLastNameInputChange={onChange}
          />
        </Box.Flex>
      </Box.Div>
    </>
  );
};

export default Content;
