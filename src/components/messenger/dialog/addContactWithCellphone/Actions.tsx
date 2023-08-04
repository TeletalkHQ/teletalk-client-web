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
      <Box.Flex
        style={{
          width: "100%",
        }}
        gap={1}
        jc="flex-end"
        ai="center"
      >
        <Input.Button variant="text" onClick={onContactDialogCancelClick}>
          Cancel
        </Input.Button>

        <Input.LoadingButton
          loadingIndicatorText="Updating..."
          disabled={isAddContactButtonDisabled}
          loading={loading}
          onClick={onAddContactClick}
        >
          Create
        </Input.LoadingButton>
      </Box.Flex>
    </>
  );
};

export default AddContactActions;
