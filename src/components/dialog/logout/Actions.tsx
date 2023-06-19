import { Input } from "~/components/general/input";
import { CommonOnClose, VoidNoArgsFn } from "~/types";

interface Props {
  onClose: CommonOnClose;
  onLogout: VoidNoArgsFn;
}

const LogoutActions: React.FC<Props> = ({ onClose, onLogout }) => (
  <>
    <Input.Button onClick={onClose} variant="text" color="primary">
      Cancel
    </Input.Button>

    <Input.Button onClick={onLogout} variant="text" color="error">
      Log out
    </Input.Button>
  </>
);

export default LogoutActions;
