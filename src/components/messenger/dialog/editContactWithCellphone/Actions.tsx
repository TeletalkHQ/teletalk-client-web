import { Input } from "~/components";
import Box from "~/components/general/box";
import { VoidNoArgsFn } from "~/types";

interface Props {
  isAddContactButtonDisabled: boolean;
  loading: boolean;
  onAddContactClick: VoidNoArgsFn;
  onContactDialogCancelClick: VoidNoArgsFn;
}
const EditContactWithCellphoneActions: React.FC<Props> = ({
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
        <Input.CancelButton onClick={onContactDialogCancelClick} />

        <Input.ConfirmButton
          disabled={isAddContactButtonDisabled}
          loading={loading}
          onClick={onAddContactClick}
        />
      </Box.Flex>
    </>
  );
};

export default EditContactWithCellphoneActions;
