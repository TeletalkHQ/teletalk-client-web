import { Input } from "~/components";
import { VoidNoArgsFn } from "~/types";

interface Props {
  onCancel: VoidNoArgsFn;
  loading: boolean;
  onSaveClick: VoidNoArgsFn;
}

const EditBioActions: React.FC<Props> = ({
  loading,
  onCancel,
  onSaveClick,
}) => (
  <>
    <Input.Button onClick={onCancel} variant="text" color="error">
      Cancel
    </Input.Button>

    <Input.LoadingButton
      loadingIndicatorText="Updating..."
      loading={loading}
      onClick={onSaveClick}
      color="primary"
    >
      Confirm
    </Input.LoadingButton>
  </>
);

export default EditBioActions;
