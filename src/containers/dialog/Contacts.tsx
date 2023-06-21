import ContactsComponents from "~/components/dialog/contacts";
import DialogTemplate from "~/components/dialog/template";
import { useGlobalStore, useMessageStore } from "~/store";
import { UserItem } from "~/types";

const Contacts = () => {
  const globalState = useGlobalStore();
  const messageState = useMessageStore();

  const handleAddContactClick = () => {
    globalState.closeDialog("contacts");
    globalState.openDialog("addContact");
  };

  const handleCloseContactDialog = () => {
    globalState.closeDialog("contacts");
  };

  const handleContactItemClicked = (contact: UserItem) => {
    handleCloseContactDialog();
    messageState.selectChat(contact.userId);
  };

  const contacts = globalState.users.filter((item) => item.isContact);

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
      open={globalState.dialogState.contacts.open}
      paperStyle={{
        height: "90vh",
      }}
      onClose={handleCloseContactDialog}
    />
  );
};

export default Contacts;
