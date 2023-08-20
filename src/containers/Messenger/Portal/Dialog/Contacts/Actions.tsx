import { Box, Button } from "~/components";
import { VoidNoArgsFn } from "~/types";

interface Props {
  onClose: VoidNoArgsFn;
  onAddContactClick: VoidNoArgsFn;
}

const Actions: React.FC<Props> = ({ onClose, onAddContactClick }) => (
  <>
    <Box.Flex
      sx={{
        width: "100%",
      }}
      jc="space-between"
      ai="center"
    >
      <Button.Close onClick={onClose} />

      <Button.PrimaryText onClick={onAddContactClick}>
        Add Contact
      </Button.PrimaryText>
    </Box.Flex>
  </>
);

export default Actions;
