import { userUtils } from "~/classes/UserUtils";
import { Template } from "~/components";
import { useEmitter } from "~/hooks";
import { useDialogState } from "~/hooks/useDialogState";
import { useGlobalStore, useUserStore } from "~/store";

import Actions from "./Actions";
import Content from "./Content";

const RemoveContact = () => {
  const globalStore = useGlobalStore();
  const userStore = useUserStore();
  const dialogState = useDialogState("removeContact");
  const { handler, loading } = useEmitter("removeContact");

  const handleRemoveContact = () => {
    handler.emitFull(
      { userId: userStore.selectedContactFromContext.userId },
      () => {
        globalStore.closeDialog();
      }
    );
  };

  return (
    <>
      <Template.Dialog
        open={dialogState.open}
        actions={
          <Actions
            loading={loading}
            onClose={globalStore.closeDialog}
            onRemove={handleRemoveContact}
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

export default RemoveContact;
