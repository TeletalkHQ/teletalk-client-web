import AppDrawer from "components/portal/AppDrawer";
import OverlayLoading from "components/portal/OverlayLoading";
import DialogContainer from "components/dialogContainer/DialogContainer";
import Portal from "components/portal/Portal";

import { useMainContext } from "hooks/useMainContext";

const PortalContainer = ({ onGlobalLoadingClose }) => {
  const {
    state: {
      globalState: { globalLoadingState },
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
