import DialogTemplate from "~/components/dialog/Template";
import LogoutComponents from "~/components/dialog/logout";

import { controllers } from "~/controllers";

import { socketEmitterStore } from "~/classes/websocket/EventManager";

const Logout = ({ onDialogClose }) => {
  const handleClose = () => {
    onDialogClose("logout");
  };

  const handleLogout = () => {
    dispatch(controllers.logout());
    socketEmitterStore.events.logout.emitFull();
  };

  return (
    <>
      <DialogTemplate
        open={state.global.dialogState.logout.open}
        actions={
          <LogoutComponents.Actions
            onClose={handleClose}
            onLogout={handleLogout}
          />
        }
        content={<LogoutComponents.Content />}
        onClose={handleClose}
      />
    </>
  );
};

export default Logout;
