import { Input } from "~/components";
import Box from "~/components/general/box";
import CircularProgress from "~/components/general/progress/CircularProgress";
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
        loadingIndicator={
          <>
            <Box.Div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Box.Span
                style={{
                  color: "white",
                }}
              >
                Pinging...
              </Box.Span>
              <Box.Span>
                <CircularProgress size={"18px"} />
              </Box.Span>
            </Box.Div>
          </>
        }
        loading={loading}
        onClick={onPingAllClick}
      >
        Ping them all!
      </Input.LoadingButton>
    </Box.Div>
  );
};

export default Actions;
