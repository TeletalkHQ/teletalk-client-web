import { Box, Button } from "~/components";
import { VoidNoArgsFn } from "~/types";

interface Props {
  isAddContactButtonDisabled: boolean;
  loading: boolean;
  onAddContactClick: VoidNoArgsFn;
  onCancel: VoidNoArgsFn;
}
const Actions: React.FC<Props> = ({
  isAddContactButtonDisabled,
  loading,
  onAddContactClick,
  onCancel,
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
        <Button.Cancel onClick={onCancel} />

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
