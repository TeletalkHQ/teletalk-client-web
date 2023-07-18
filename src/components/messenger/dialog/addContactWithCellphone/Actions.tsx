import { Input } from "~/components";
import Box from "~/components/general/box";
import { VoidNoArgsFn } from "~/types";

interface Props {
  isAddContactButtonDisabled: boolean;
  onAddContactClick: VoidNoArgsFn;
  onContactDialogCancelClick: VoidNoArgsFn;
}
const AddContactActions: React.FC<Props> = ({
  isAddContactButtonDisabled,
  onAddContactClick,
  onContactDialogCancelClick,
}) => {
  return (
    <>
      <Box.Flex gap={1} jc="flex-end" ai="center">
        <Box.Div>
          <Input.Button variant="text" onClick={onContactDialogCancelClick}>
            Cancel
          </Input.Button>
        </Box.Div>
        <Box.Div>
          <Input.Button
            disabled={isAddContactButtonDisabled}
            variant="text"
            onClick={onAddContactClick}
          >
            Create
          </Input.Button>
        </Box.Div>
      </Box.Flex>
    </>
  );
};

export default AddContactActions;
