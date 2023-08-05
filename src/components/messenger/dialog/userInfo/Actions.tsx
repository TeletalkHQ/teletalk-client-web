import { Input } from "~/components";
import { CommonOnClose } from "~/types";

interface Props {
  onClose: CommonOnClose;
}

const UserInfoActions: React.FC<Props> = ({ onClose }) => (
  <>
    <Input.CloseButton onClick={onClose} />
  </>
);

export default UserInfoActions;
