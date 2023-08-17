import React from "react";

import { extractor } from "~/classes/Extractor";
import { maker } from "~/classes/Maker";
import Actions from "~/components/messenger/dialog/editContactWithCellphone/Actions";
import Content from "~/components/messenger/dialog/editContactWithCellphone/Content";
import Title from "~/components/messenger/dialog/editContactWithCellphone/Title";
import DialogTemplate from "~/components/messenger/dialog/template";
import { useEmitter, useListener } from "~/hooks";
import { useGlobalStore, useUserStore } from "~/store";
import { OnChangeValidatorFn } from "~/types";
import { utils } from "~/utils";

const EditContactWithCellphone = () => {
  const globalStore = useGlobalStore();
  const userStore = useUserStore();
  const { handler, loading } = useEmitter("editContact");

  useListener({
    evName: "editContact",
    cb(response) {
      userStore.updateUser(response.data.editedContact);
    },
  });

  const handleInputChange: OnChangeValidatorFn = (_value: string, event) => {
    userStore.setSelectedContactFromContext({
      ...userStore.selectedContactFromContext,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddContactClick = () => {
    handler.emitFull(
      {
        ...extractor.fullName(userStore.selectedContactFromContext),
        userId: userStore.selectedContactFromContext.userId,
      },
      returnToContactsDialog
    );
  };

  const handleClose = () => {
    globalStore.closeDialog("editContactWithCellphone");
    userStore.setSelectedContactFromContext(maker.emptyUser());
  };

  const returnToContactsDialog = () => {
    handleClose();
    globalStore.openDialog("contacts");
  };

  const isSubmitDisabled = utils.isFullNameValid(
    userStore.selectedContactFromContext
  );

  return (
    <>
      <DialogTemplate
        title={<Title />}
        content={
          <Content
            fullName={userStore.selectedContactFromContext}
            onChange={handleInputChange}
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
        onClose={handleClose}
      />
    </>
  );
};

export default EditContactWithCellphone;
