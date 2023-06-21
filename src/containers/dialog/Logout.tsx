import { socketEmitterStore } from "~/classes/websocket/SocketEmitterStore";
import LogoutComponents from "~/components/dialog/logout";
import DialogTemplate from "~/components/dialog/template";
import { useGlobalStore } from "~/store";

const Logout = () => {
  const globalState = useGlobalStore();

  const handleClose = () => {
    globalState.closeDialog("logout");
  };

  const handleLogout = () => {
    socketEmitterStore.events.logout.emitFull(undefined, async () => {
      handleClose();
    });
  };

  return (
    <>
      <DialogTemplate
        open={globalState.dialogState.logout.open}
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
