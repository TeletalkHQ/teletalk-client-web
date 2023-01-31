import { Input } from "src/components/general/input";

const EditFullNameActions = ({ onCancel, onSaveClick }) => (
  <>
    <Input.Button onClick={onCancel} variant="text" color="error">
      Cancel
    </Input.Button>

    <Input.Button onClick={onSaveClick} variant="text" color="primary">
      Save
    </Input.Button>
  </>
);

export default EditFullNameActions;
