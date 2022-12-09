import AddNewContact from "src/containers/dialog/AddNewContact";
import Contacts from "src/containers/dialog/Contacts";
import LogoutDialog from "src/containers/dialog/Logout";

import { useDispatch } from "src/hooks/useThunkReducer";

import { commonActions } from "src/store/commonActions";

const Dialog = () => {
  const dispatch = useDispatch();

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
