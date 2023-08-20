import { Template } from "~/components";
import { useCustomRouter, useEmitter } from "~/hooks";
import { useGlobalStore } from "~/store";

import Actions from "./Actions";
import Content from "./Content";

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
      <Template.Dialog
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
