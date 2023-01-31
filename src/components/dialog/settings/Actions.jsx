import { Box } from "src/components/general/box";
import { Input } from "src/components/general/input";

const SettingsActions = ({ onClose }) => (
  <>
    <Box.Div>
      <Input.Button
        variant="text"
        style={{ fontWeight: "bold" }}
        onClick={onClose}
      >
        Close
      </Input.Button>
    </Box.Div>
  </>
);

export default SettingsActions;
