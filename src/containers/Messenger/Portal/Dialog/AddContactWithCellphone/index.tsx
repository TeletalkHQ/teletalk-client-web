import React from "react";

import { maker } from "~/classes/Maker";
import { Template } from "~/components";
import { useEmitter } from "~/hooks";
import { useGlobalStore, useUserStore } from "~/store";
import { OnChangeValidatorFn } from "~/types";
import { utils } from "~/utils";

import Actions from "./Actions";
import Content from "./Content";
import Title from "./Title";

const AddContactWithCellphone = () => {
  const globalStore = useGlobalStore();
  const userStore = useUserStore();
  const { handler, loading } = useEmitter("addContactWithCellphone");

  const handleChange: OnChangeValidatorFn = (_value: string, event) => {
    userStore.setAddingContactWithCellphone({
      [event.target.name]: event.target.value,
    });
  };

  const handleAddClick = () => {
    handler.emitFull(
      userStore.addingContactWithCellphone,
      returnToContactsDialog
    );
  };

  const closeDialog = () => {
    globalStore.closeDialog("addContactWithCellphone");
    userStore.setAddingContactWithCellphone(
      maker.emptyAddingContactWithCellphone()
    );
  };

  const returnToContactsDialog = () => {
    closeDialog();
    globalStore.openDialog("contacts");
  };

  const isSubmitDisabled = utils.isContactWithCellphoneValid(
    userStore.addingContactWithCellphone
  );

  return (
    <>
      <Template.Dialog
        title={<Title />}
        content={
          <Content
            contact={userStore.addingContactWithCellphone}
            onChange={handleChange}
          />
        }
        actions={
          <Actions
            loading={loading}
            onAddContactClick={handleAddClick}
            onContactDialogCancelClick={returnToContactsDialog}
            isAddContactButtonDisabled={isSubmitDisabled}
          />
        }
        open={globalStore.dialogState.addContactWithCellphone.open}
        paperStyle={{
          height: "50vh",
        }}
        onClose={closeDialog}
      />
    </>
  );
};

export default AddContactWithCellphone;
