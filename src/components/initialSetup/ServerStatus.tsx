import { Input } from "~/components";
import Box from "~/components/general/box";
import StatusIndicator from "~/components/other/StatusIndicator";
import { Status, VoidNoArgsFn } from "~/types";

interface Props {
  disabled?: boolean;
  indicatorValue?: string;
  loading: boolean;
  onClick: VoidNoArgsFn;
  status: Status;
}

const ServerStatus: React.FC<Props> = ({
  disabled,
  indicatorValue,
  loading,
  onClick,
  status,
}) => {
  return (
    <Input.LoadingButton
      disabled={disabled}
      loading={loading}
      loadingIndicatorText={indicatorValue}
      onClick={onClick}
      sx={(theme) => ({
        ":disabled": {
          backgroundColor: theme.palette.primary.dark,
          color: theme.palette.text.disabled,
        },
        borderRadius: "10px",
        color: theme.palette.background.default,
        display: "flex",
        justifyContent: "space-around",
        padding: "10px",
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
