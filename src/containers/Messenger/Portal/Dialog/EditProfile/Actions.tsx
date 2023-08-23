import { Button } from "~/components";
import { VoidNoArgsFn } from "~/types";

interface Props {
  onCancel: VoidNoArgsFn;
}

const Actions: React.FC<Props> = ({ onCancel }) => (
  <>
    <Button.Close onClick={onCancel} />
  </>
);

export default Actions;
