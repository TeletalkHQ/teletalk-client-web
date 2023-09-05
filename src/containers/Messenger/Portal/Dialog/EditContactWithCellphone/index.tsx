import React from "react";

import { extractor } from "~/classes/Extractor";
import { maker } from "~/classes/Maker";
import { Template } from "~/components";
import { useEmitter } from "~/hooks";
import { useDialogState } from "~/hooks/useDialogState";
import { useGlobalStore, useUserStore } from "~/store";
import { OnChangeValidatorFn } from "~/types";
import { utils } from "~/utils";

import Actions from "./Actions";
import Content from "./Content";
import Title from "./Title";

const EditContactWithCellphone = () => {
  const globalStore = useGlobalStore();
  const userStore = useUserStore();
  const dialogState = useDialogState("editContactWithCellphone");
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
      handleClose
    );
  };

  const handleClose = () => {
    globalStore.closeDialog();
    resetStates();
  };

  const resetStates = () => {
    userStore.setSelectedContactFromContext(maker.emptyUser());
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
            onCancel={handleClose}
            isAddContactButtonDisabled={isSubmitDisabled}
          />
        }
        open={dialogState.open}
        onAfterClose={resetStates}
      />
    </>
  );
};

export default EditContactWithCellphone;
