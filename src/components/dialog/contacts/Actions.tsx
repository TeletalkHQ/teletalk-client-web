import React from "react";

import Box from "~/components/general/box";
import { Input } from "~/components/general/input";
import { VoidNoArgsFn } from "~/types";

interface Props {
  onClose: VoidNoArgsFn;
  onAddContactClick: VoidNoArgsFn;
}

const ContactsActions: React.FC<Props> = ({ onClose, onAddContactClick }) => (
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
