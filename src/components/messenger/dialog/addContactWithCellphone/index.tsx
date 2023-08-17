import React from "react";

import { maker } from "~/classes/Maker";
import Actions from "~/components/messenger/dialog/addContactWithCellphone/Actions";
import Content from "~/components/messenger/dialog/addContactWithCellphone/Content";
import Title from "~/components/messenger/dialog/addContactWithCellphone/Title";
import DialogTemplate from "~/components/messenger/dialog/template";
import { useEmitter, useListener } from "~/hooks";
import { useGlobalStore, useUserStore } from "~/store";
import { OnChangeValidatorFn } from "~/types";
import { utils } from "~/utils";

const AddContactWithCellphone = () => {
  const globalStore = useGlobalStore();
  const userStore = useUserStore();
  const { handler, loading } = useEmitter("addContactWithCellphone");

  useListener({
    evName: "addContactWithCellphone",
    cb(response) {
      userStore.updateUser({
        ...response.data.addedContact,
        isContact: true,
      });
    },
  });

  const handleChange: OnChangeValidatorFn = (_value: string, event) => {
    userStore.setAddingContactWithCellphone({
      ...userStore.addingContactWithCellphone,
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
      <DialogTemplate
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
