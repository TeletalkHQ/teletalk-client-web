import { Input } from "~/components";
import Box from "~/components/general/box";
import { VoidNoArgsFn } from "~/types";

interface Props {
  onClose: VoidNoArgsFn;
  onAddContactClick: VoidNoArgsFn;
}

const ContactsActions: React.FC<Props> = ({ onClose, onAddContactClick }) => (
  <>
    <Box.Flex
      sx={{
        width: "100%",
      }}
      jc="space-between"
      ai="center"
    >
      <Input.CloseButton onClick={onClose} />

      <Input.PrimaryTextButton onClick={onAddContactClick}>
        Add Contact
      </Input.PrimaryTextButton>
    </Box.Flex>
  </>
);

export default ContactsActions;
