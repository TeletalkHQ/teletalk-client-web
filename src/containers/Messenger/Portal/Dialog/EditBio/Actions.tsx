import { Button } from "~/components";
import { VoidNoArgsFn } from "~/types";

interface Props {
  onCancel: VoidNoArgsFn;
  loading: boolean;
  onSaveClick: VoidNoArgsFn;
}

const Actions: React.FC<Props> = ({ loading, onCancel, onSaveClick }) => (
  <>
    <Button.Cancel onClick={onCancel} />

    <Button.Confirm loading={loading} onClick={onSaveClick} />
  </>
);

export default Actions;
