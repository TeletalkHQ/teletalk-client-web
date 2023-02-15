import ContactsComponents from "src/components/dialog/contacts";
import DialogTemplate from "src/components/dialog/Template";

import { useDispatch, useSelector } from "react-redux";

import { actions } from "src/store/actions";
import { commonActions } from "src/store/commonActions";
import { stateStatics } from "src/store/stateStatics";

const Contacts = ({ onDialogClose }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const handleAddContactClick = () => {
    dispatch(commonActions.closeDialog(stateStatics.DIALOG_NAMES.CONTACTS));
    dispatch(commonActions.openDialog(stateStatics.DIALOG_NAMES.ADD_CONTACT));
  };

  const handleCloseContactDialog = () => {
    onDialogClose("contacts");
  };

  const handleContactItemClicked = (contact) => {
    handleCloseContactDialog();
    dispatch(actions.selectedUserForPrivateChat({ userId: contact.userId }));
  };

  return (
    <DialogTemplate
      title={<ContactsComponents.Title />}
      content={
        <ContactsComponents.Content
          contacts={state.user.contacts}
          onContactItemClicked={handleContactItemClicked}
        />
      }
      actions={
        <ContactsComponents.Actions
          onClose={handleCloseContactDialog}
          onAddContactClick={handleAddContactClick}
        />
      }
      open={state.global.dialogState.contacts.open}
      paperStyle={{ height: "90vh" }}
      onClose={handleCloseContactDialog}
    />
  );
};

export default Contacts;
