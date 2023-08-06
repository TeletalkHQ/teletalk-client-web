import { userUtils } from "~/classes/UserUtils";
import Actions from "~/components/messenger/dialog/removeContact/Actions";
import Content from "~/components/messenger/dialog/removeContact/Content";
import DialogTemplate from "~/components/messenger/dialog/template";
import { useEmitter, useListener } from "~/hooks";
import { useGlobalStore } from "~/store";

const RemoveContact = () => {
  const globalStore = useGlobalStore();
  const { handler, loading } = useEmitter("removeContact");

  const handleClose = () => {
    globalStore.closeDialog("removeContact");
  };

  useListener({
    evName: "removeContact",
    cb(response) {
      globalStore.removeUser(response.data.removedContact);
    },
  });

  const handleRemoveContact = () => {
    handler.emitFull(
      { userId: globalStore.selectedContactFromContext.userId },
      () => {
        handleClose();
        globalStore.openDialog("contacts");
      }
    );
  };

  return (
    <>
      <DialogTemplate
        open={globalStore.dialogState.removeContact.open}
        actions={
          <Actions
            loading={loading}
            onClose={handleClose}
            onRemove={handleRemoveContact}
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

export default RemoveContact;
