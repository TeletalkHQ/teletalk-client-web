import { userUtils } from "~/classes/UserUtils";
import { Template } from "~/components";
import { useEmitter, useListener } from "~/hooks";
import { useGlobalStore, useUserStore } from "~/store";

import Actions from "./Actions";
import Content from "./Content";

const BlockUser = () => {
  const globalStore = useGlobalStore();
  const userStore = useUserStore();

  const { handler: addBlockHandler, loading: addBlockLoading } =
    useEmitter("addBlock");

  useListener({
    evName: "addBlock",
    cb(response) {
      userStore.updateUser({
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
      userStore.updateUser({
        userId: response.data.removedBlock.userId,
        isBlocked: false,
      });
    },
  });

  const handleConfirm = () => {
    (userStore.selectedContactFromContext.isBlocked
      ? removeBlockHandler
      : addBlockHandler
    ).emitFull({ userId: userStore.selectedContactFromContext.userId }, () => {
      handleClose();
      globalStore.openDialog("contacts");
    });
  };

  const handleBack = () => {
    handleClose();
    globalStore.openDialog("contacts");
  };

  const handleClose = () => {
    globalStore.closeDialog("blockUser");
  };

  const loading = addBlockLoading || removeBlockLoading;

  return (
    <>
      <Template.Dialog
        open={globalStore.dialogState.blockUser.open}
        actions={
          <Actions
            loading={loading}
            onClose={handleBack}
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
        onClose={handleClose}
      />
    </>
  );
};

export default BlockUser;
