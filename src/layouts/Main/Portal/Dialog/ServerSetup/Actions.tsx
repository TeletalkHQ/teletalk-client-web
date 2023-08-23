import { Button } from "~/components";
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
      {/* <Button.Close disabled={isCloseDisabled} onClick={onClose} /> */}

      <Button.Primary
        loading={loading}
        onClick={onAuthenticateClick}
        disabled={isAuthDisabled}
        loadingIndicatorText="Authenticating..."
      >
        Authenticate
      </Button.Primary>
    </>
  );
};

export default ServerSetupActions;
