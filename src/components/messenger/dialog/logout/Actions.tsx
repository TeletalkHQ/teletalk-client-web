import { Input } from "~/components";
import { CommonOnClose, VoidNoArgsFn } from "~/types";

interface Props {
  onClose: CommonOnClose;
  onLogout: VoidNoArgsFn;
}

const LogoutActions: React.FC<Props> = ({ onClose, onLogout }) => (
  <>
    <Input.CloseButton onClick={onClose} />

    <Input.ErrorTextButton onClick={onLogout}>Log out</Input.ErrorTextButton>
  </>
);

export default LogoutActions;
