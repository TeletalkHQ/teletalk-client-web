import { actions } from "actions/actions";

import AddNewContactDialog from "components/dialogs/AddNewContactDialog";
import ContactsDialog from "components/dialogs/ContactsDialog";
import LogoutDialog from "components/dialogs/LogoutDialog";

import { defaultDialogStateItemProps } from "functions/utilities/stateUtilities";

import { useMainContext } from "hooks/useMainContext";

const DialogContainer = () => {
  const {
    hooksOutput: { dispatch },
  } = useMainContext();

  const handleDialogClose = (dialogName) => {
    dispatch(
      actions.dialogOpenChange({
        ...defaultDialogStateItemProps(),
        dialogName,
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
