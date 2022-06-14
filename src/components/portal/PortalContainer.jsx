import Portal from "components/portal/Portal";

import AppDrawer from "components/portal/AppDrawer";
import MyBackdrop from "components/portal/MyBackdrop";

import { useMyContext } from "hooks/useMyContext";
import DialogContainer from "components/dialogContainer/DialogContainer";

const PortalContainer = ({ onBackdropClose }) => {
  const {
    state: {
      globalState: { backdropState },
    },
  } = useMyContext();

  return (
    <Portal>
      <MyBackdrop
        onBackdropClose={onBackdropClose}
        backdropState={backdropState}
      />
      <AppDrawer />
      <DialogContainer />
    </Portal>
  );
};

export default PortalContainer;
