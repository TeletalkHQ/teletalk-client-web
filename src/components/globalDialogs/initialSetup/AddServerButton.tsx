import { Input } from "~/components";
import { VoidNoArgsFn } from "~/types";

interface Props {
  onAddServerClick: VoidNoArgsFn;
}

const AddServerButton: React.FC<Props> = ({ onAddServerClick }) => {
  return (
    <>
      <Input.PrimaryButton onClick={onAddServerClick}>
        Add server
      </Input.PrimaryButton>
    </>
  );
};

export default AddServerButton;
