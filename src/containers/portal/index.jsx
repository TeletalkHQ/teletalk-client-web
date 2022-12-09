import { createPortal } from "react-dom";

import AppDrawer from "components/portal/AppDrawer";
import OverlayLoading from "components/portal/OverlayLoading";

import DialogContainer from "containers/dialog";

import { useSelector } from "hooks/useThunkReducer";

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
        loading={state.global.fullPageLoading}
      />

      <DialogContainer />
    </PortalContainer>
  );
};

export default Portal;
