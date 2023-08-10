import { Input } from "~/components";
import { VoidNoArgsFn } from "~/types";

interface Props {
  onPingAllClick: VoidNoArgsFn;
  loading: boolean;
}

const Actions: React.FC<Props> = ({ loading, onPingAllClick }) => {
  return (
    <Input.LoadingButton
      loadingIndicatorText="Pinging..."
      loading={loading}
      onClick={onPingAllClick}
    >
      Ping all servers
    </Input.LoadingButton>
  );
};

export default Actions;
