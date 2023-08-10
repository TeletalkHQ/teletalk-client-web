import { userUtils } from "~/classes/UserUtils";
import Actions from "~/components/messenger/dialog/removeContact/Actions";
import Content from "~/components/messenger/dialog/removeContact/Content";
import DialogTemplate from "~/components/messenger/dialog/template";
import { useEmitter, useListener } from "~/hooks";
import { useGlobalStore, useUserStore } from "~/store";

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
      <DialogTemplate
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
