import { Template } from "~/components";
import { useDialogState } from "~/hooks/useDialogState";
import { useGlobalStore } from "~/store";

import Actions from "./Actions";
import Content from "./Content";

const BlockedUsers = () => {
  const globalStore = useGlobalStore();
  const dialogState = useDialogState("blockedUsers");

  const handleItemClick = () => {
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
