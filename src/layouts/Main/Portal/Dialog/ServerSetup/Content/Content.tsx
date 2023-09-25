import { Box, Button, Components } from "~/components";
import { Status, Url, VoidNoArgsFn, VoidWithArg } from "~/types";

import AddServerButton from "./AddServerButton";
import ServerSelect from "./ServersSelect";

interface Props {
  disabled: boolean;
  onAddServerClick: VoidNoArgsFn;
  onServersClick: VoidNoArgsFn;
  onServerSelectChange: VoidWithArg<Url>;
  selectedServer: string;
  status: Status;
}

const ServerSetupContent: React.FC<Props> = ({
  disabled,
  onAddServerClick,
  onServersClick,
  onServerSelectChange,
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
    </Box.Flex>
  );
};

export default ServerSetupContent;
