import { Input } from "~/components";
import { VoidNoArgsFn } from "~/types";

interface Props {
  onCancel: VoidNoArgsFn;
  loading: boolean;
  onSaveClick: VoidNoArgsFn;
}

const EditBioActions: React.FC<Props> = ({
  loading,
  onCancel,
  onSaveClick,
}) => (
  <>
    <Input.CancelButton onClick={onCancel} />

    <Input.ConfirmButton loading={loading} onClick={onSaveClick} />
  </>
);

export default EditBioActions;
