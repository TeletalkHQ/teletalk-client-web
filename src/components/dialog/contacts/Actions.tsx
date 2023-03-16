import { Box } from "src/components/general/box";
import { Input } from "src/components/general/input";

const ContactsActions = ({ onClose, onAddContactClick }) => (
  <>
    <Box.Flex sx={{ width: "100%" }} jc="space-between" ai="center">
      <Box.Div>
        <Input.Button
          variant="text"
          style={{ fontWeight: "bold" }}
          onClick={onAddContactClick}
        >
          Add Contact
        </Input.Button>
      </Box.Div>

      <Box.Div>
        <Input.Button
          variant="text"
          style={{ fontWeight: "bold" }}
          onClick={onClose}
        >
          Close
        </Input.Button>
      </Box.Div>
    </Box.Flex>
  </>
);

export default ContactsActions;
