import { Input } from "~/components";
import Box from "~/components/general/box";
import { CommonOnClose, VoidNoArgsFn } from "~/types";

interface Props {
  loading: boolean;
  onClose: CommonOnClose;
  onLogout: VoidNoArgsFn;
}

const LogoutActions: React.FC<Props> = ({ loading, onClose, onLogout }) => (
  <>
    <Box.Div style={{ width: "35%" }}>
      <Input.CloseButton onClick={onClose} />
    </Box.Div>

    <Box.Div
      style={{
        width: "65%",
      }}
    >
      <Input.ErrorButton
        loadingIndicatorText="Logging out..."
        loading={loading}
        onClick={onLogout}
      >
        Log out
      </Input.ErrorButton>
    </Box.Div>
  </>
);

export default LogoutActions;
