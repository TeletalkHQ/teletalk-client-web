import { Box, Input } from "~/components";
import { AddContactWithCellphoneIO, OnChangeValidatorFn } from "~/types";

interface Props {
  contact: AddContactWithCellphoneIO["input"];
  onChange: OnChangeValidatorFn;
}

const Content: React.FC<Props> = ({ contact, onChange }) => {
  return (
    <>
      <Box.Div>
        <Box.Div></Box.Div>

        <Box.Flex col jc="space-between" mt={2}>
          <Input.Text.FullName
            firstName={contact.firstName}
            lastName={contact.lastName}
            onFirstNameInputChange={onChange}
            onLastNameInputChange={onChange}
          />

          <Input.Text.Cellphone
            countryCode={contact.countryCode}
            countryName={contact.countryName}
            onChange={onChange}
            phoneNumber={contact.phoneNumber}
          />
        </Box.Flex>
      </Box.Div>
    </>
  );
};

export default Content;
