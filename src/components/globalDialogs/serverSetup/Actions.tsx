import { Input } from "~/components";
import { VoidNoArgsFn } from "~/types";

interface Props {
  // isCloseDisabled: boolean;
  isAuthDisabled: boolean;
  loading: boolean;
  onAuthenticateClick: VoidNoArgsFn;
  // onClose: VoidNoArgsFn;
}

const ServerSetupActions: React.FC<Props> = ({
  isAuthDisabled,
  // isCloseDisabled,
  loading,
  onAuthenticateClick,
  // onClose,
}) => {
  return (
    <>
      {/* <Input.CloseButton disabled={isCloseDisabled} onClick={onClose} /> */}

      <Input.PrimaryButton
        loading={loading}
        onClick={onAuthenticateClick}
        disabled={isAuthDisabled}
        loadingIndicatorText="Authenticating..."
      >
        Authenticate
      </Input.PrimaryButton>
    </>
  );
};

export default ServerSetupActions;
