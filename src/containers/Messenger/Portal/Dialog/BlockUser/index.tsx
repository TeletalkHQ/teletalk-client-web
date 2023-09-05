import { userUtils } from "~/classes/UserUtils";
import { Template } from "~/components";
import { useEmitter } from "~/hooks";
import { useDialogState } from "~/hooks/useDialogState";
import { useGlobalStore, useUserStore } from "~/store";

import Actions from "./Actions";
import Content from "./Content";

const BlockUser = () => {
  const globalStore = useGlobalStore();
  const userStore = useUserStore();
  const dialogState = useDialogState("blockUser");

  const { handler: addBlockHandler, loading: addBlockLoading } =
    useEmitter("addBlock");

  const { handler: removeBlockHandler, loading: removeBlockLoading } =
    useEmitter("removeBlock");

  const handleConfirm = () => {
    (userStore.selectedContactFromContext.isBlocked
      ? removeBlockHandler
      : addBlockHandler
    ).emitFull(
      { userId: userStore.selectedContactFromContext.userId },
      globalStore.closeDialog
    );
  };

  const loading = addBlockLoading || removeBlockLoading;

  return (
    <>
      <Template.Dialog
        open={dialogState.open}
        actions={
          <Actions
            loading={loading}
            onCancel={globalStore.closeDialog}
            onConfirm={handleConfirm}
          />
        }
        content={
          <Content
            fullName={userUtils.concatFirstNameWithLastName(
              userStore.selectedContactFromContext
            )}
          />
        }
      />
    </>
  );
};

export default BlockUser;
