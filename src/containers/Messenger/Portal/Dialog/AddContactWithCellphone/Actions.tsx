import { Box, Button } from "~/components";
import { VoidNoArgsFn } from "~/types";

interface Props {
  isAddContactButtonDisabled: boolean;
  loading: boolean;
  onAddContactClick: VoidNoArgsFn;
  onContactDialogCancelClick: VoidNoArgsFn;
}

const Actions: React.FC<Props> = ({
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
        <Button.Cancel onClick={onContactDialogCancelClick} />

        <Button.Confirm
          disabled={isAddContactButtonDisabled}
          loading={loading}
          onClick={onAddContactClick}
        />
      </Box.Flex>
    </>
  );
};

export default Actions;
