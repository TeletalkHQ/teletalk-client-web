import Box from "~/components/general/box";
import StatusIndicator from "~/components/other/StatusIndicator";
import { Status, VoidNoArgsFn } from "~/types";

import { Input } from "../general/input";
import CircularProgress from "../general/progress/CircularProgress";

interface Props {
  disabled?: boolean;
  indicatorValue?: string;
  loading?: boolean;
  onClick?: VoidNoArgsFn;
  status: Status;
}

const ServerStatus: React.FC<Props> = ({
  indicatorValue,
  loading,
  onClick,
  status,
  disabled,
}) => {
  return (
    <Input.LoadingButton
      disabled={disabled}
      loading={loading}
      loadingIndicator={
        <>
          <Box.Span>{indicatorValue}</Box.Span>
          <CircularProgress style={{ marginLeft: 10 }} size={20} color="info" />
        </>
      }
      onClick={onClick}
      sx={(theme) => ({
        color: theme.palette.background.default,
        borderRadius: "10px",
        padding: "10px",
        display: "flex",
        justifyContent: "space-around",
        ":disabled": {
          color: theme.palette.text.disabled,
          backgroundColor: theme.palette.primary.dark,
        },
      })}
    >
      <Box.Span>Status:</Box.Span>
      <Box.Span style={{ textAlign: "end" }}>
        <StatusIndicator status={status} />
        {status}
      </Box.Span>
    </Input.LoadingButton>
  );
};

export default ServerStatus;
