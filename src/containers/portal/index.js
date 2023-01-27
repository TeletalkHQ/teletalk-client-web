import { createPortal } from "react-dom";

import AppDrawer from "src/containers/portal/appDrawer";
import FullPageLoading from "src/components/portal/FullPageLoading";
import OverlayLoading from "src/components/portal/OverlayLoading";

import DialogContainer from "src/containers/dialog";

import { useSelector } from "src/hooks/useThunkReducer";

const PortalProvider = ({ children }) => {
  return createPortal(children, document.querySelector("#portalContainer"));
};

const Portal = ({ onGlobalLoadingClose }) => {
  const state = useSelector();

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
