import CircleIcon from "@mui/icons-material/Circle";

import { Status } from "~/types";
import { variables } from "~/variables";

import Box from "../general/box";

interface Props {
  status: Status;
}

const StatusIndicator: React.FC<Props> = ({ status }) => {
  return (
    <Box.Span>
      <CircleIcon
        style={{
          fontSize: "12px",
          color: variables.connectionColors[status],
          margin: "0px 4px",
        }}
      />
    </Box.Span>
  );
};

export default StatusIndicator;
