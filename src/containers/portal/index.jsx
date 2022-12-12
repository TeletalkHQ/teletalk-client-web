import { createPortal } from "react-dom";

import AppDrawer from "src/components/portal/AppDrawer";
import OverlayLoading from "src/components/portal/OverlayLoading";

import DialogContainer from "src/containers/dialog";

import { useSelector } from "src/hooks/useThunkReducer";

const PortalContainer = ({ children }) => {
  return createPortal(children, document.querySelector("#portalContainer"));
};

const Portal = ({ onGlobalLoadingClose }) => {
  const state = useSelector();

  return (
    <PortalContainer>
      <AppDrawer />
      <OverlayLoading
        onGlobalLoadingClose={onGlobalLoadingClose}
        loading={state.global.globalLoading}
      />
      <DialogContainer />
    </PortalContainer>
  );
};

export default Portal;
