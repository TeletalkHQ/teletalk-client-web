import AddNewContactDialog from "components/dialog/AddNewContact";
import Contacts from "components/dialog/Contacts";
import LogoutDialog from "components/dialog/Logout";

import { useMainContext } from "hooks/useMainContext";

import { commonActions } from "store/commonActions";

const Dialog = () => {
  const {
    hooksOutput: { dispatch },
  } = useMainContext();

  const handleDialogClose = (dialogName) => {
    dispatch(commonActions.closeDialog(dialogName));
  };

  return (
    <>
      {[AddNewContactDialog, Contacts, LogoutDialog].map((Component, i) => (
        <Component key={i} onDialogClose={handleDialogClose} />
      ))}
    </>
  );
};

export default Dialog;
