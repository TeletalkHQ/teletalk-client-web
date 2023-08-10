import { Input } from "~/components";
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
      loadingIndicatorText={indicatorText}
    >
      Setup
    </Input.LoadingButton>
  );
};

export default SetupButton;
