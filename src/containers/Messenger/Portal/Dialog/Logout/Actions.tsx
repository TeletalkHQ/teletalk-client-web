import { Box, Button } from "~/components";
import { CommonOnClose, VoidNoArgsFn } from "~/types";

interface Props {
  loading: boolean;
  onClose: CommonOnClose;
  onLogout: VoidNoArgsFn;
}

const Actions: React.FC<Props> = ({ loading, onClose, onLogout }) => (
  <>
    <Box.Div style={{ width: "35%" }}>
      <Button.Close onClick={onClose} />
    </Box.Div>

    <Box.Div
      style={{
        width: "65%",
      }}
    >
      <Button.Error
        loadingIndicatorText="Logging out..."
        loading={loading}
        onClick={onLogout}
      >
        Log out
      </Button.Error>
    </Box.Div>
  </>
);

export default Actions;
