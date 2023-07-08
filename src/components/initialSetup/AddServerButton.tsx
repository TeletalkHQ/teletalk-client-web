import { VoidNoArgsFn } from "~/types";

import { Input } from "../general/input";

interface Props {
  onAddServerClick: VoidNoArgsFn;
}

const AddServerButton: React.FC<Props> = ({ onAddServerClick }) => {
  return (
    <>
      <Input.Button onClick={onAddServerClick}>Add server</Input.Button>
    </>
  );
};

export default AddServerButton;
