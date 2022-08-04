import AddNewContactDialog from "components/dialogContainer/AddNewContactDialog";
import ContactsDialog from "components/dialogContainer/ContactsDialog";
import LogoutDialog from "components/dialogContainer/LogoutDialog";

import { useMyContext } from "hooks/useMyContext";

import { globalActions } from "actions/globalActions";

const DialogContainer = () => {
  const {
    state: {
      globalState: { dialogState },
    },
    hooksOutput: { dispatch },
  } = useMyContext();

  const handleClose = (target) => {
    dispatch(
      globalActions.dialogAction({
        dialogState: {
          ...dialogState,
          [target]: { ...dialogState[target], open: false },
        },
      })
    );
  };

  return (
    <>
      <AddNewContactDialog onClose={handleClose} />

      <ContactsDialog onClose={handleClose} />

      <LogoutDialog onClose={handleClose} />
    </>
  );
};

export default DialogContainer;
