import { Input } from "~/components/general/input";
import { VoidNoArgsFn } from "~/types";

interface Props {
  onCancel: VoidNoArgsFn;
}

const EditProfileActions: React.FC<Props> = ({ onCancel }) => (
  <>
    <Input.Button onClick={onCancel} variant="text" color="primary">
      Close
    </Input.Button>
  </>
);

export default EditProfileActions;
