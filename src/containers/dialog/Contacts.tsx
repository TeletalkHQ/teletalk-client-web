import ContactsComponents from "~/components/dialog/contacts";
import DialogTemplate from "~/components/dialog/Template";

import { actions } from "~/store/actions";
import { commonActions } from "~/store/commonActions";
import { stateStatics } from "~/store/stateStatics";

const Contacts = ({ onDialogClose }) => {
  const handleAddContactClick = () => {
    dispatch(commonActions.closeDialog(stateStatics.DIALOG_NAMES.CONTACTS));
    dispatch(commonActions.openDialog(stateStatics.DIALOG_NAMES.ADD_CONTACT));
  };

  const handleCloseContactDialog = () => {
    onDialogClose("contacts");
  };

  const handleContactItemClicked = (contact) => {
    handleCloseContactDialog();
    dispatch(
      actions.selectedChat({
        id: contact.userId,
        type: "private",
      })
    );
  };

  const contacts = state.global.users.filter((item) => item.isContact);

  return (
    <DialogTemplate
      title={<ContactsComponents.Title />}
      content={
        <ContactsComponents.Content
          contacts={contacts}
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
      paperStyle={{
        height: "90vh",
      }}
      onClose={handleCloseContactDialog}
    />
  );
};

export default Contacts;
