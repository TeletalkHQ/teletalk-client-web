import { userUtils } from "~/classes/UserUtils";
import Actions from "~/components/messenger/dialog/blockUser/Actions";
import Content from "~/components/messenger/dialog/blockUser/Content";
import DialogTemplate from "~/components/messenger/dialog/template";
import { useEmitter, useListener } from "~/hooks";
import { useGlobalStore } from "~/store";

const BlockUser = () => {
  const globalStore = useGlobalStore();

  const { handler: addBlockHandler, loading: addBlockLoading } =
    useEmitter("addBlock");

  useListener({
    evName: "addBlock",
    cb(response) {
      globalStore.updateUser({
        userId: response.data.blockedUser.userId,
        isBlocked: true,
      });
    },
  });

  const { handler: removeBlockHandler, loading: removeBlockLoading } =
    useEmitter("removeBlock");

  useListener({
    evName: "removeBlock",
    cb(response) {
      globalStore.updateUser({
        userId: response.data.removedBlock.userId,
        isBlocked: false,
      });
    },
  });

  const handleConfirm = () => {
    (globalStore.selectedContactFromContext.isBlocked
      ? removeBlockHandler
      : addBlockHandler
    ).emitFull(
      { userId: globalStore.selectedContactFromContext.userId },
      () => {
        handleClose();
        globalStore.openDialog("contacts");
      }
    );
  };

  const handleClose = () => {
    globalStore.closeDialog("blockUser");
    globalStore.openDialog("contacts");
  };

  const loading = addBlockLoading || removeBlockLoading;

  return (
    <>
      <DialogTemplate
        open={globalStore.dialogState.blockUser.open}
        actions={
          <Actions
            loading={loading}
            onClose={handleClose}
            onConfirm={handleConfirm}
          />
        }
        content={
          <Content
            fullName={userUtils.concatFirstNameWithLastName(
              globalStore.selectedContactFromContext
            )}
          />
        }
        onClose={handleClose}
      />
    </>
  );
};

export default BlockUser;
