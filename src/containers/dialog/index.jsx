import AddNewContact from "containers/dialog/AddNewContact";
import Contacts from "containers/dialog/Contacts";
import LogoutDialog from "containers/dialog/Logout";

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
      {[AddNewContact, Contacts, LogoutDialog].map((Component, i) => (
        <Component key={i} onDialogClose={handleDialogClose} />
      ))}
    </>
  );
};

export default Dialog;
