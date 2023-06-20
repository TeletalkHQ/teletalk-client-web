import Box from "~/components/general/box";
import { Input } from "~/components/general/input";
import { VoidNoArgsFn } from "~/types";

interface Props {
  isAddNewContactButtonDisabled: boolean;
  onAddNewContactClick: VoidNoArgsFn;
  onContactDialogCancelClick: VoidNoArgsFn;
}
const AddNewContactActions: React.FC<Props> = ({
  isAddNewContactButtonDisabled,
  onAddNewContactClick,
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
            disabled={isAddNewContactButtonDisabled}
            variant="text"
            onClick={onAddNewContactClick}
          >
            Create
          </Input.Button>
        </Box.Div>
      </Box.Flex>
    </>
  );
};

export default AddNewContactActions;
