import { Input } from "~/components/general/input";

import { CommonOnClose } from "~/types";

interface Props {
  onClose: CommonOnClose;
}

const UserInfoActions: React.FC<Props> = ({ onClose }) => (
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
