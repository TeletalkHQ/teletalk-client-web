import { Box, Button } from "~/components";
import { VoidNoArgsFn } from "~/types";

interface Props {
  isConfirmDisabled: boolean;
  loading: boolean;
  onCancel: VoidNoArgsFn;
  onConfirm: VoidNoArgsFn;
}

const Actions: React.FC<Props> = ({
  isConfirmDisabled,
  loading,
  onCancel,
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
        <Button.SecondaryCancel onClick={onCancel} />

        <Button.PrimaryConfirm
          disabled={isConfirmDisabled}
          loading={loading}
          onClick={onConfirm}
        />
      </Box.Flex>
    </>
  );
};

export default Actions;
