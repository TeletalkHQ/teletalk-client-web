import { Input } from "src/components/general/input";

const EditUsernameActions = ({ onCancel, onSaveClick }) => (
  <>
    <Input.Button onClick={onCancel} variant="text" color="error">
      Cancel
    </Input.Button>

    <Input.Button onClick={onSaveClick} variant="text" color="primary">
      Confirm
    </Input.Button>
  </>
);

export default EditUsernameActions;
