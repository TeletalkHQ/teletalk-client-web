import { Input } from "~/components";
import { VoidNoArgsFn } from "~/types";

interface Props {
  disabled: boolean;
  onAddServerClick: VoidNoArgsFn;
}

const AddServerButton: React.FC<Props> = ({ disabled, onAddServerClick }) => {
  return (
    <>
      <Input.PrimaryButton disabled={disabled} onClick={onAddServerClick}>
        Add server
      </Input.PrimaryButton>
    </>
  );
};

export default AddServerButton;
