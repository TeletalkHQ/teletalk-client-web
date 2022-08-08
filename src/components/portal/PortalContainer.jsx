import Portal from "components/portal/Portal";

import AppDrawer from "components/portal/AppDrawer";
import DefaultGlobalLoading from "components/portal/DefaultGlobalLoading";

import { useMainContext } from "hooks/useMainContext";
import DialogContainer from "components/dialogContainer/DialogContainer";

const PortalContainer = ({ onBackdropClose }) => {
  const {
    state: {
      globalState: { globalLoadingState },
    },
  } = useMainContext();

  return (
    <Portal>
      <DefaultGlobalLoading
        onBackdropClose={onBackdropClose}
        globalLoadingState={globalLoadingState}
      />
      <AppDrawer />
      <DialogContainer />
    </Portal>
  );
};

export default PortalContainer;
