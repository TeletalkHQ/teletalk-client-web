import Box from "~/components/general/box";
import StatusIndicator from "~/components/other/StatusIndicator";
import { Status } from "~/types";

import { Input } from "../general/input";

interface Props {
  status: Status;
}

const ServerStatus: React.FC<Props> = ({ status }) => {
  return (
    <Input.Button
      sx={(theme) => ({
        color: theme.palette.background.default,
        borderRadius: "10px",
        padding: "10px",
        display: "flex",
        justifyContent: "space-around",
      })}
    >
      <Box.Span>Server status:</Box.Span>
      <Box.Span style={{ textAlign: "end" }}>
        <StatusIndicator status={status} />
        {status}
      </Box.Span>
    </Input.Button>
  );
};

export default ServerStatus;
