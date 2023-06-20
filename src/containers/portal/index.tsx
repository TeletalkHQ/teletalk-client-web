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
      <FullPageLoading loading={state.global.globalLoading} />
      <AppDrawer />
      <OverlayLoading
        onGlobalLoadingClose={onGlobalLoadingClose}
        loading={state.global.globalLoading}
      />
      <DialogContainer />
    </PortalProvider>
  );
};

export default Portal;
