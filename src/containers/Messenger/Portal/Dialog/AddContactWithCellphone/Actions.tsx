import { Box, Button } from "~/components";
import { VoidNoArgsFn } from "~/types";

interface Props {
  isAddContactButtonDisabled: boolean;
  loading: boolean;
  onAddContactClick: VoidNoArgsFn;
  onCancelClick: VoidNoArgsFn;
}

const Actions: React.FC<Props> = ({
  isAddContactButtonDisabled,
  loading,
  onAddContactClick,
  onCancelClick,
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
        <Button.SecondaryCancel onClick={onCancelClick} />

        <Button.PrimaryConfirm
          disabled={isAddContactButtonDisabled}
          loading={loading}
          onClick={onAddContactClick}
        />
      </Box.Flex>
    </>
  );
};

export default Actions;
