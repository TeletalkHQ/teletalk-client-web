import { Input } from "~/components";
import { CommonOnClose, VoidNoArgsFn } from "~/types";

interface Props {
  loading: boolean;
  onClose: CommonOnClose;
  onConfirm: VoidNoArgsFn;
}

const BlockUserActions: React.FC<Props> = ({ loading, onClose, onConfirm }) => {
  return (
    <>
      <Input.CloseButton onClick={onClose} />

      <Input.ErrorButton loading={loading} onClick={onConfirm}>
        Confirm
      </Input.ErrorButton>
    </>
  );
};

export default BlockUserActions;
