import { userUtils } from "~/classes/UserUtils";
import { Template } from "~/components";
import { useEmitter, useListener } from "~/hooks";
import { useGlobalStore, useUserStore } from "~/store";

import Actions from "./Actions";
import Content from "./Content";

const RemoveContact = () => {
  const globalStore = useGlobalStore();
  const userStore = useUserStore();
  const { handler, loading } = useEmitter("removeContact");

  useListener({
    evName: "removeContact",
    cb(response) {
      userStore.removeContact(response.data.removedContact);
    },
  });

  const handleRemoveContact = () => {
    handler.emitFull(
      { userId: userStore.selectedContactFromContext.userId },
      () => {
        handleClose();
        globalStore.openDialog("contacts");
      }
    );
  };

  const handleBack = () => {
    handleClose();
    globalStore.openDialog("contacts");
  };

  const handleClose = () => {
    globalStore.closeDialog("removeContact");
  };

  return (
    <>
      <Template.Dialog
        open={globalStore.dialogState.removeContact.open}
        actions={
          <Actions
            loading={loading}
            onClose={handleBack}
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
        onClose={handleClose}
      />
    </>
  );
};

export default RemoveContact;
