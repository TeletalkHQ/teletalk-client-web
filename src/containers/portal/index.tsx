import { createPortal } from "react-dom";

import FullPageLoading from "~/components/portal/FullPageLoading";
import OverlayLoading from "~/components/portal/OverlayLoading";
import DialogContainer from "~/containers/dialog";
import AppDrawer from "~/containers/portal/appDrawer";

const PortalProvider = ({ children }) => {
  return createPortal(children, document.querySelector("#portalContainer"));
};

const Portal = ({ onGlobalLoadingClose }) => {
  return (
    <PortalProvider>
      <FullPageLoading loading={globalState.globalLoading} />
      <AppDrawer />
      <OverlayLoading
        onGlobalLoadingClose={onGlobalLoadingClose}
        loading={globalState.globalLoading}
      />
      <DialogContainer />
    </PortalProvider>
  );
};

export default Portal;
