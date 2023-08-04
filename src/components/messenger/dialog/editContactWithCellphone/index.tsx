import React from "react";

import { maker } from "~/classes/Maker";
import Actions from "~/components/messenger/dialog/editContactWithCellphone/Actions";
import Content from "~/components/messenger/dialog/editContactWithCellphone/Content";
import Title from "~/components/messenger/dialog/editContactWithCellphone/Title";
import DialogTemplate from "~/components/messenger/dialog/template";
import { useEmitter } from "~/hooks/useEmitter";
import { useListener } from "~/hooks/useListener";
import { useGlobalStore, useUserStore } from "~/store";
import { CommonChangeEvent } from "~/types";
import { utils } from "~/utils";

const EditContactWithCellphone = () => {
  const globalStore = useGlobalStore();
  const userStore = useUserStore();
  const { handler, loading } = useEmitter("editContact");

  useListener({
    evName: "editContact",
    cb(response) {
      userStore.editContact(response.data.editedContact);
    },
  });

  const handleInputChange = (_value: string, event: CommonChangeEvent) => {
    globalStore.setEditingContact({
      ...globalStore.editingContact,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddContactClick = () => {
    handler.emitFull(globalStore.editingContact, returnToContactsDialog);
  };

  const closeAddContactDialog = () => {
    globalStore.closeDialog("editContactWithCellphone");
    globalStore.setEditingContact(maker.emptyContactWithUserId());
  };

  const returnToContactsDialog = () => {
    closeAddContactDialog();
    globalStore.openDialog("contacts");
  };

  const isSubmitDisabled = utils.isFullNameValid(globalStore.editingContact);

  return (
    <>
      <DialogTemplate
        title={<Title />}
        content={
          <Content
            fullName={globalStore.editingContact}
            onInputChange={handleInputChange}
          />
        }
        actions={
          <Actions
            loading={loading}
            onAddContactClick={handleAddContactClick}
            onContactDialogCancelClick={returnToContactsDialog}
            isAddContactButtonDisabled={isSubmitDisabled}
          />
        }
        open={globalStore.dialogState.editContactWithCellphone.open}
        onClose={closeAddContactDialog}
      />
    </>
  );
};

export default EditContactWithCellphone;
