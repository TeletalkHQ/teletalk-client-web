import AppDrawer from "components/portal/AppDrawer";
import OverlayLoading from "components/portal/OverlayLoading";
import DialogContainer from "containers/Dialog";
import Portal from "components/portal/Portal";

import { useMainContext } from "hooks/useMainContext";

const PortalContainer = ({ onGlobalLoadingClose }) => {
  const { state } = useMainContext();

  return (
    <Portal>
      <AppDrawer />
      <OverlayLoading
        onGlobalLoadingClose={onGlobalLoadingClose}
        loading={state.global.loading}
      />

      <DialogContainer />
    </Portal>
  );
};

export default PortalContainer;
