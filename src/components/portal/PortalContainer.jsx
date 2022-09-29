import AppDrawer from "components/portal/AppDrawer";
import OverlayLoading from "components/portal/OverlayLoading";
import DialogContainer from "components/containers/DialogContainer";
import Portal from "components/portal/Portal";

import { useMainContext } from "hooks/useMainContext";

const PortalContainer = ({ onGlobalLoadingClose }) => {
  const {
    state: {
      global: { globalLoadingState },
    },
  } = useMainContext();

  return (
    <Portal>
      <AppDrawer />
      <OverlayLoading
        onGlobalLoadingClose={onGlobalLoadingClose}
        globalLoadingState={globalLoadingState}
      />

      <DialogContainer />
    </Portal>
  );
};

export default PortalContainer;
