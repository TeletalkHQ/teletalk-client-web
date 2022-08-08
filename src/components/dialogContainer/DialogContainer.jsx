import AddNewContactDialog from "components/dialogContainer/AddNewContactDialog";
import ContactsDialog from "components/dialogContainer/ContactsDialog";
import LogoutDialog from "components/dialogContainer/LogoutDialog";

import { useMainContext } from "hooks/useMainContext";

import { globalActions } from "actions/globalActions";

const DialogContainer = () => {
  const {
    hooksOutput: { dispatch },
  } = useMainContext();

  const handleClose = (dialogName) => {
    dispatch(
      globalActions.dialogOpenChangeAction({
        open: false,
        dialogName,
      })
    );
  };

  return (
    <>
      {[AddNewContactDialog, ContactsDialog, LogoutDialog].map(
        (Component, i) => (
          <Component key={i} onClose={handleClose} />
        )
      )}
    </>
  );
};

export default DialogContainer;
