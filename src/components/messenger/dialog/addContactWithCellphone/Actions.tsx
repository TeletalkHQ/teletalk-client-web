import { Input } from "~/components";
import Box from "~/components/general/box";
import { VoidNoArgsFn } from "~/types";

interface Props {
  isAddContactButtonDisabled: boolean;
  loading: boolean;
  onAddContactClick: VoidNoArgsFn;
  onContactDialogCancelClick: VoidNoArgsFn;
}
const AddContactActions: React.FC<Props> = ({
  isAddContactButtonDisabled,
  loading,
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
          <Input.LoadingButton
            loadingIndicatorText="Updating..."
            disabled={isAddContactButtonDisabled}
            loading={loading}
            onClick={onAddContactClick}
          >
            Create
          </Input.LoadingButton>
        </Box.Div>
      </Box.Flex>
    </>
  );
};

export default AddContactActions;
