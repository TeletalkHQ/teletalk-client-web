import { Template } from "~/components";
import { useEmitter } from "~/hooks";
import { useGlobalStore, useMessageStore, useUserStore } from "~/store";
import { OnChangeValidatorFn } from "~/types";
import { utils } from "~/utils";

import Actions from "./Actions";
import Content from "./Content";
import Title from "./Title";

const AddContactWithUserId = () => {
  const globalStore = useGlobalStore();
  const userStore = useUserStore();
  const messageStore = useMessageStore();
  const { loading, handler } = useEmitter("addContactWithUserId");

  const closeDialog = () => {
    globalStore.closeDialog("addContactWithUserId");
  };

  const handleChange: OnChangeValidatorFn = (_value: string, event) => {
    userStore.setAddingContactWithUserId({
      [event.target.name]: event.target.value,
    });
  };

  const isConfirmDisabled = utils.isFullNameValid(
    userStore.addingContactWithUserId
  );

  const handleConfirm = () => {
    handler.emitFull(
      {
        ...userStore.addingContactWithUserId,
        userId: messageStore.selectedChatInfo.userId,
      },
      () => {
        closeDialog();
      }
    );
  };

  return (
    <>
      <Template.Dialog
        title={<Title />}
        content={
          <Content
            contact={userStore.addingContactWithUserId}
            onChange={handleChange}
          />
        }
        actions={
          <Actions
            onCancelClick={closeDialog}
            onConfirm={handleConfirm}
            loading={loading}
            isConfirmDisabled={isConfirmDisabled}
          />
        }
        open={globalStore.dialogState.addContactWithUserId.open}
        onClose={closeDialog}
      />
    </>
  );
};

export default AddContactWithUserId;
