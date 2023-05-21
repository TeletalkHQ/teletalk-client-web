import { Input } from "~/components/general/input";

const LogoutActions = ({ onClose, onLogout }) => (
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
