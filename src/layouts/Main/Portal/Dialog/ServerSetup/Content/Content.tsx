import { Box, Button, Components } from "~/components";
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
      <Components.ServerStatus status={status} />

      <ServerSelect
        disabled={disabled}
        onServerSelectChange={onServerSelectChange}
        selectedServer={selectedServer}
      />

      <AddServerButton
        disabled={disabled}
        onAddServerClick={onAddServerClick}
      />

      <Button.Primary disabled={disabled} onClick={onServersClick}>
        Servers
      </Button.Primary>

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
