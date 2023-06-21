import { createPortal } from "react-dom";

import FullPageLoading from "~/components/loadings/FullPageLoading";
import OverlayLoading from "~/components/loadings/OverlayLoading";
import DialogContainer from "~/containers/dialog";
import AppDrawer from "~/containers/drawer";

interface ProviderProps {
  children: React.ReactElement;
}

const PortalProvider: React.FC<ProviderProps> = ({ children }) => {
  return createPortal(children, document.querySelector("#portalContainer")!);
};

const Portal = () => {
  return (
    <PortalProvider>
      <>
        <FullPageLoading />
        <AppDrawer />
        <OverlayLoading />
        <DialogContainer />
      </>
    </PortalProvider>
  );
};

export default Portal;
