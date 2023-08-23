import { Box, Button } from "~/components";
import { VoidNoArgsFn } from "~/types";

interface Props {
  isConfirmDisabled: boolean;
  loading: boolean;
  onCancelClick: VoidNoArgsFn;
  onConfirm: VoidNoArgsFn;
}

const Actions: React.FC<Props> = ({
  isConfirmDisabled,
  loading,
  onCancelClick,
  onConfirm,
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
        <Button.Cancel onClick={onCancelClick} />

        <Button.Confirm
          disabled={isConfirmDisabled}
          loading={loading}
          onClick={onConfirm}
        />
      </Box.Flex>
    </>
  );
};

export default Actions;
