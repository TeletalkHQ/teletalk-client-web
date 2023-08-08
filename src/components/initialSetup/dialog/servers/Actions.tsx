import { Input } from "~/components";
import Box from "~/components/general/box";
import { VoidNoArgsFn } from "~/types";

interface Props {
  onPingAllClick: VoidNoArgsFn;
  loading: boolean;
}

const Actions: React.FC<Props> = ({ loading, onPingAllClick }) => {
  return (
    <Box.Div
      style={{
        padding: "15px",
        width: "100%",
      }}
    >
      <Input.LoadingButton
        loadingIndicatorText="Pinging..."
        loading={loading}
        onClick={onPingAllClick}
      >
        Ping them all!
      </Input.LoadingButton>
    </Box.Div>
  );
};

export default Actions;
