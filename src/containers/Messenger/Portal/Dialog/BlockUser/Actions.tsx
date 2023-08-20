import { Button } from "~/components";
import { CommonOnClose, VoidNoArgsFn } from "~/types";

interface Props {
  loading: boolean;
  onClose: CommonOnClose;
  onConfirm: VoidNoArgsFn;
}

const Actions: React.FC<Props> = ({ loading, onClose, onConfirm }) => {
  return (
    <>
      <Button.Close onClick={onClose} />

      <Button.ErrorConfirm loading={loading} onClick={onConfirm} />
    </>
  );
};

export default Actions;
