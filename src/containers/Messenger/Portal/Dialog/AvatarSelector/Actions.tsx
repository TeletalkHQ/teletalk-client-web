import { Button } from "~/components";
import { CommonOnClose, VoidNoArgsFn } from "~/types";

interface Props {
  isSaveDisabled: boolean;
  loading: boolean;
  onClose: CommonOnClose;
  onSave: VoidNoArgsFn;
}

const Actions: React.FC<Props> = ({
  isSaveDisabled,
  loading,
  onClose,
  onSave,
}) => (
  <>
    <Button.PrimaryClose onClick={onClose} />

    <Button.Primary
      disabled={isSaveDisabled}
      loadingIndicatorText="Saving..."
      loading={loading}
      onClick={onSave}
    >
      Save
    </Button.Primary>
  </>
);

export default Actions;
