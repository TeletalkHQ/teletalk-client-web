import { Input } from "~/components";
import { CommonOnClose, VoidNoArgsFn } from "~/types";

interface Props {
  loading: boolean;
  onClose: CommonOnClose;
  onRemove: VoidNoArgsFn;
}

const RemoveContactActions: React.FC<Props> = ({
  loading,
  onClose,
  onRemove,
}) => (
  <>
    <Input.CloseButton onClick={onClose} />

    <Input.ErrorButton
      loadingIndicatorText="Removing..."
      loading={loading}
      onClick={onRemove}
    >
      Remove
    </Input.ErrorButton>
  </>
);

export default RemoveContactActions;
