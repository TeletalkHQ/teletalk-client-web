import { socketEmitterStore } from "~/classes/websocket/SocketEmitterStore";
import Actions from "~/components/messenger/dialog/logout/Actions";
import Content from "~/components/messenger/dialog/logout/Content";
import DialogTemplate from "~/components/messenger/dialog/template";
import { useGlobalStore } from "~/store";
import { LogoutIO } from "~/types";

const Logout = () => {
  const globalState = useGlobalStore();

  const handleClose = () => {
    globalState.closeDialog("logout");
  };

  const handleLogout = () => {
    socketEmitterStore.events.logout.emitFull<LogoutIO>(
      {},
      async ({ data }) => {
        handleClose();
        return data;
      }
    );
  };

  return (
    <>
      <DialogTemplate
        open={globalState.dialogState.logout.open}
        actions={<Actions onClose={handleClose} onLogout={handleLogout} />}
        content={<Content />}
        onClose={handleClose}
      />
    </>
  );
};

export default Logout;
