import { Input } from "~/components/general/input";

const UserInfoActions = ({ onClose }) => (
  <>
    <Input.Button
      variant="text"
      style={{ fontWeight: "bold" }}
      onClick={onClose}
    >
      Close
    </Input.Button>
  </>
);

export default UserInfoActions;
