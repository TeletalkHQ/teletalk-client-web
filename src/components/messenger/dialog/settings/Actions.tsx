import { Input } from "~/components";
import { VoidNoArgsFn } from "~/types";

interface Props {
  onClose: VoidNoArgsFn;
}

const SettingsActions: React.FC<Props> = ({ onClose }) => (
  <>
    <Input.CloseButton onClick={onClose} />
  </>
);

export default SettingsActions;
