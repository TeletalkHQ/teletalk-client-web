import Box from "~/components/general/box";
import { Input } from "~/components/general/input";
import { VoidNoArgsFn } from "~/types";

interface Props {
  onAddClick: VoidNoArgsFn;
  disabled: boolean;
}

const Actions: React.FC<Props> = ({ disabled, onAddClick }) => {
  return (
    <Box.Div
      style={{
        padding: "15px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Input.LoadingButton disabled={disabled} onClick={onAddClick}>
        Add
      </Input.LoadingButton>
    </Box.Div>
  );
};

export default Actions;
