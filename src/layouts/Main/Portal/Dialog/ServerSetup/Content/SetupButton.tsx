import { Button } from "~/components";
import { VoidNoArgsFn } from "~/types";

interface Props {
  disabled: boolean;
  indicatorText: string;
  loading: boolean;
  onSetup: VoidNoArgsFn;
}

const SetupButton: React.FC<Props> = ({
  disabled,
  indicatorText,
  loading,
  onSetup,
}) => {
  return (
    <Button.Primary
      disabled={disabled}
      loading={loading}
      loadingIndicatorText={indicatorText}
      onClick={onSetup}
    >
      Setup
    </Button.Primary>
  );
};

export default SetupButton;
