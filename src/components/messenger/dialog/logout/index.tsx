import Actions from "~/components/messenger/dialog/logout/Actions";
import Content from "~/components/messenger/dialog/logout/Content";
import DialogTemplate from "~/components/messenger/dialog/template";
import { useCustomRouter, useEmitter } from "~/hooks";
import { useGlobalStore } from "~/store";

const Logout = () => {
  const globalState = useGlobalStore();
  const { handler, loading } = useEmitter("logout");
  const router = useCustomRouter();

  const handleClose = () => {
    globalState.closeDialog("logout");
  };

  const handleLogout = () => {
    handler.emitFull({}, () => {
      handleClose();
      router.push("signIn");
    });
  };

  return (
    <>
      <DialogTemplate
        open={globalState.dialogState.logout.open}
        actions={
          <Actions
            loading={loading}
            onClose={handleClose}
            onLogout={handleLogout}
          />
        }
        content={<Content />}
        onClose={handleClose}
      />
    </>
  );
};

export default Logout;
