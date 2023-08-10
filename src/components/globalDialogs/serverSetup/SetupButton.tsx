import { Input } from "~/components";
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
    <Input.PrimaryButton
      disabled={disabled}
      loading={loading}
      loadingIndicatorText={indicatorText}
      onClick={onSetup}
    >
      Setup
    </Input.PrimaryButton>
  );
};

export default SetupButton;
