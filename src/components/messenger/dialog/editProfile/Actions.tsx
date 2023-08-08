import { Input } from "~/components";
import { VoidNoArgsFn } from "~/types";

interface Props {
  onCancel: VoidNoArgsFn;
}

const EditProfileActions: React.FC<Props> = ({ onCancel }) => (
  <>
    <Input.CloseButton onClick={onCancel} />
  </>
);

export default EditProfileActions;
