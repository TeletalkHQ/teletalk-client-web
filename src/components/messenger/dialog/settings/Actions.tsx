import { Input } from "~/components";
import { VoidNoArgsFn } from "~/types";

interface Props {
  onClose: VoidNoArgsFn;
}

const SettingsActions: React.FC<Props> = ({ onClose }) => (
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

export default SettingsActions;
