import { Input } from "~/components";
import Box from "~/components/general/box";
import ServerStatus from "~/components/globalDialogs/ServerStatus";
import { Status, Url, VoidNoArgsFn } from "~/types";

import AddServerButton from "./AddServerButton";
import ServerSelect from "./ServersSelect";
import SetupButton from "./SetupButton";

interface Props {
  disabled: boolean;
  loading: boolean;
  onAddServerClick: VoidNoArgsFn;
  onServersClick: VoidNoArgsFn;
  onServerSelectChange: (url: Url) => void;
  onSetup: VoidNoArgsFn;
  selectedServer: string;
  status: Status;
}

const ServerSetupContent: React.FC<Props> = ({
  disabled,
  loading,
  onAddServerClick,
  onServersClick,
  onServerSelectChange,
  onSetup,
  selectedServer,
  status,
}) => {
  return (
    <Box.Flex gap="10px" padding="10px" col maxWidth="400px">
      <ServerStatus status={status} />

      <ServerSelect
        disabled={disabled}
        onServerSelectChange={onServerSelectChange}
        selectedServer={selectedServer}
      />

      <AddServerButton
        disabled={disabled}
        onAddServerClick={onAddServerClick}
      />

      <Input.PrimaryButton disabled={disabled} onClick={onServersClick}>
        Servers
      </Input.PrimaryButton>

      <SetupButton
        indicatorText={status === "online" ? "Forwarding..." : "Trying..."}
        loading={loading}
        onSetup={onSetup}
        disabled={disabled}
      />
    </Box.Flex>
  );
};

export default ServerSetupContent;
