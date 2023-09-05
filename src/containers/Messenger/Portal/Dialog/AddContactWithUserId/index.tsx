import { Template } from "~/components";
import { useDialogState, useEmitter } from "~/hooks";
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
  const dialogState = useDialogState("addContactWithUserId");

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
      globalStore.closeDialog
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
            onCancel={globalStore.closeDialog}
            onConfirm={handleConfirm}
            loading={loading}
            isConfirmDisabled={isConfirmDisabled}
          />
        }
        open={dialogState.open}
      />
    </>
  );
};

export default AddContactWithUserId;
