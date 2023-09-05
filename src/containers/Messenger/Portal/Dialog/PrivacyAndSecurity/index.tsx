import { Template } from "~/components";
import { useDialogState } from "~/hooks/useDialogState";
import { useGlobalStore } from "~/store";
import { DialogName } from "~/types";

import Actions from "./Actions";
import Content from "./Content";

const PrivacyAndSecurity = () => {
  const globalState = useGlobalStore();
  const dialogState = useDialogState("privacyAndSecurity");

  const handleItemClick = (d: DialogName) => {
    globalState.openDialog(d);
  };

  return (
    <>
      <Template.Dialog
        open={dialogState.open}
        actions={<Actions onClose={globalState.closeDialog} />}
        content={<Content onItemClick={handleItemClick} />}
      />
    </>
  );
};

export default PrivacyAndSecurity;
