import { Input } from "src/components/general/input";

const EditProfileActions = ({ onCancel }) => (
  <>
    <Input.Button onClick={onCancel} variant="text" color="primary">
      Close
    </Input.Button>
  </>
);

export default EditProfileActions;