import { Input } from "~/components";
import { VoidNoArgsFn } from "~/types";

interface Props {
  loading: boolean;
  onCancel: VoidNoArgsFn;
  onSaveClick: VoidNoArgsFn;
}

const EditFullNameActions: React.FC<Props> = ({
  loading,
  onCancel,
  onSaveClick,
}) => (
  <>
    <Input.CancelButton onClick={onCancel} />

    <Input.ConfirmButton loading={loading} onClick={onSaveClick} />
  </>
);

export default EditFullNameActions;
