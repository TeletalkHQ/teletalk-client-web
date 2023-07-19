import { Input } from "~/components";
import Box from "~/components/general/box";
import CircularProgress from "~/components/general/progress/CircularProgress";
import { VoidNoArgsFn } from "~/types";

interface Props {
  indicatorText: string;
  loading: boolean;
  onSetup: VoidNoArgsFn;
}

const SetupButton: React.FC<Props> = ({ indicatorText, loading, onSetup }) => {
  return (
    <Input.LoadingButton
      loading={loading}
      onClick={onSetup}
      style={{
        textAlign: "center",
      }}
      loadingIndicator={
        <Box.Span>
          <Box.Span
            style={{
              color: "white",
            }}
          >
            {indicatorText}
          </Box.Span>
          <CircularProgress
            style={{
              marginLeft: 10,
            }}
            size={20}
            color="info"
          />
        </Box.Span>
      }
    >
      Setup
    </Input.LoadingButton>
  );
};

export default SetupButton;
