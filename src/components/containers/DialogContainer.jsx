import AddNewContactDialog from "components/dialogs/AddNewContactDialog";
import ContactsDialog from "components/dialogs/ContactsDialog";
import LogoutDialog from "components/dialogs/LogoutDialog";

import { useMainContext } from "hooks/useMainContext";

import { globalActions } from "actions/globalActions";

const DialogContainer = () => {
  const {
    hooksOutput: { dispatch },
  } = useMainContext();

  const handleDialogClose = (dialogName) => {
    dispatch(
      globalActions.dialogOpenChangeAction({
        dialogName,
        open: false,
      })
    );
  };

  return (
    <>
      {[AddNewContactDialog, ContactsDialog, LogoutDialog].map(
        (Component, i) => (
          <Component key={i} onDialogClose={handleDialogClose} />
        )
      )}
    </>
  );
};

export default DialogContainer;
