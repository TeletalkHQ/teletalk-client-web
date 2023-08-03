import { Input } from "~/components";
import { VoidNoArgsFn } from "~/types";

interface Props {
  loading: boolean;
  onCancel: VoidNoArgsFn;
  onSaveClick: VoidNoArgsFn;
}

const EditFullNameActions: React.FC<Props> = ({
  loading,
  onCancel,
  onSaveClick,
}) => (
  <>
    {/* //TODO: Replace with CancelButton */}
    <Input.Button onClick={onCancel} variant="text" color="error">
      Cancel
    </Input.Button>

    <Input.LoadingButton
      loading={loading}
      loadingIndicatorText="Updating..."
      onClick={onSaveClick}
      color="primary"
    >
      Confirm
    </Input.LoadingButton>
  </>
);

export default EditFullNameActions;
