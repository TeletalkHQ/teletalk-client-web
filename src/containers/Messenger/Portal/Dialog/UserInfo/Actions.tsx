import { Button } from "~/components";
import { CommonOnClose } from "~/types";

interface Props {
  onClose: CommonOnClose;
}

const Actions: React.FC<Props> = ({ onClose }) => (
  <>
    <Button.Close onClick={onClose} />
  </>
);

export default Actions;
