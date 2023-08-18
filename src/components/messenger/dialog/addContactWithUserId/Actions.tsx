import { Input } from "~/components";
import Box from "~/components/general/box";
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
        <Input.CancelButton onClick={onCancelClick} />

        <Input.ConfirmButton
          disabled={isConfirmDisabled}
          loading={loading}
          onClick={onConfirm}
        />
      </Box.Flex>
    </>
  );
};

export default Actions;
