import { Template } from "~/components";
import { useCustomRouter, useEmitter } from "~/hooks";
import { useDialogState } from "~/hooks/useDialogState";
import { useGlobalStore } from "~/store";

import Actions from "./Actions";
import Content from "./Content";

const Logout = () => {
  const globalState = useGlobalStore();
  const dialogState = useDialogState("logout");
  const { handler, loading } = useEmitter("logout");
  const router = useCustomRouter();

  const handleLogout = () => {
    handler.emitFull({}, () => {
      globalState.closeDialog();
      router.push("signIn");
    });
  };

  return (
    <>
      <Template.Dialog
        open={dialogState.open}
        actions={
          <Actions
            loading={loading}
            onClose={globalState.closeDialog}
            onLogout={handleLogout}
          />
        }
        content={<Content />}
      />
    </>
  );
};

export default Logout;
