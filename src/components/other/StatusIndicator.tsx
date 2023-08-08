import CircleIcon from "@mui/icons-material/Circle";

import Box from "~/components/general/box";
import { Status, StatusColors } from "~/types";

interface Props {
  status: Status;
}

export const statusColors: StatusColors = {
  idle: "white",
  offline: "red",
  online: "green",
  pending: "yellow",
};

const StatusIndicator: React.FC<Props> = ({ status }) => {
  return (
    <Box.Span>
      <CircleIcon
        style={{
          fontSize: "12px",
          color: statusColors[status],
          margin: "0px 4px",
        }}
      />
    </Box.Span>
  );
};

export default StatusIndicator;
