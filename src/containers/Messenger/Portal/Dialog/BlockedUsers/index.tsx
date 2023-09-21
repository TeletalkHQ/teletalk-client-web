import { UserId } from "teletalk-type-store";

import { Template } from "~/components";
import { useDialogState } from "~/hooks";
import { useGlobalStore, useUserStore } from "~/store";

import Actions from "./Actions";
import Content from "./Content";

const BlockedUsers = () => {
  const globalStore = useGlobalStore();
  const userStore = useUserStore();
  const dialogState = useDialogState("blockedUsers");

  const handleItemClick = (userId: UserId) => {
    userStore.setSelectedUserIdForActions(userId);
    globalStore.openDialog("removeBlock");
  };

  return (
    <>
      <Template.Dialog
        open={dialogState.open}
        actions={<Actions onClose={globalStore.closeDialog} />}
        content={<Content onItemLick={handleItemClick} />}
      />
    </>
  );
};

export default BlockedUsers;
