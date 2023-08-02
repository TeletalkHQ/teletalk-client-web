import Actions from "~/components/messenger/dialog/logout/Actions";
import Content from "~/components/messenger/dialog/logout/Content";
import DialogTemplate from "~/components/messenger/dialog/template";
import { useEmitter } from "~/hooks/useEmitter";
import { useGlobalStore } from "~/store";

const Logout = () => {
  const globalState = useGlobalStore();
  const { handler } = useEmitter("logout");

  const handleClose = () => {
    globalState.closeDialog("logout");
  };

  const handleLogout = () => {
    handler.emitFull({}, async ({ data }) => {
      handleClose();
      return data;
    });
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
