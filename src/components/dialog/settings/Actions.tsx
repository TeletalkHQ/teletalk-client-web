import { Input } from "src/components/general/input";

const SettingsActions = ({ onClose }) => (
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
