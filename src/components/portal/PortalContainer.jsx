import AppDrawer from "components/portal/AppDrawer";
import OverlayLoading from "components/portal/OverlayLoading";
import DialogContainer from "components/containers/DialogContainer";
import Portal from "components/portal/Portal";

import { useMainContext } from "hooks/useMainContext";

const PortalContainer = ({ onGlobalLoadingClose }) => {
  const {
    state: {
      global: { loading },
    },
  } = useMainContext();

  return (
    <Portal>
      <AppDrawer />
      <OverlayLoading
        onGlobalLoadingClose={onGlobalLoadingClose}
        loading={loading}
      />

      <DialogContainer />
    </Portal>
  );
};

export default PortalContainer;
