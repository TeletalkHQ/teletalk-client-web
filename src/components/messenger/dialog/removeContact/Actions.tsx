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

    <Input.ErrorButton loading={loading} onClick={onRemove}>
      {/* CLEANME:  Error confirm button */}
      Confirm
    </Input.ErrorButton>
  </>
);

export default RemoveContactActions;
