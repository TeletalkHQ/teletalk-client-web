import React from "react";

import { extractor } from "~/classes/Extractor";
import { maker } from "~/classes/Maker";
import { Template } from "~/components";
import { useEmitter } from "~/hooks";
import { useGlobalStore, useUserStore } from "~/store";
import { OnChangeValidatorFn } from "~/types";
import { utils } from "~/utils";

import Actions from "./Actions";
import Content from "./Content";
import Title from "./Title";

const EditContactWithCellphone = () => {
  const globalStore = useGlobalStore();
  const userStore = useUserStore();
  const { handler, loading } = useEmitter("updateContact");

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
      <Template.Dialog
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
