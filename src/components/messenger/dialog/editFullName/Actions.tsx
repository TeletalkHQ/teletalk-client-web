import { Input } from "~/components";
import { VoidNoArgsFn } from "~/types";

interface Props {
  onCancel: VoidNoArgsFn;
  onSaveClick: VoidNoArgsFn;
}

const EditFullNameActions: React.FC<Props> = ({ onCancel, onSaveClick }) => (
  <>
    <Input.Button onClick={onCancel} variant="text" color="error">
      Cancel
    </Input.Button>

    <Input.Button onClick={onSaveClick} variant="text" color="primary">
      Save
    </Input.Button>
  </>
);

export default EditFullNameActions;
