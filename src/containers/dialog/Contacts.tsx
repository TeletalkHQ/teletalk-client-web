import { ContactItem } from "utility-store/lib/types";

import ContactsComponents from "~/components/dialog/contacts";
import DialogTemplate from "~/components/dialog/template";
import { useGlobalStore, useMessageStore, useUserStore } from "~/store";

const Contacts = () => {
  const globalStore = useGlobalStore();
  const messageStore = useMessageStore();
  const userStore = useUserStore();

  const handleAddContactClick = () => {
    globalStore.closeDialog("contacts");
    globalStore.openDialog("addContact");
  };

  const handleCloseContactDialog = () => {
    globalStore.closeDialog("contacts");
  };

  const handleContactItemClicked = (contact: ContactItem) => {
    handleCloseContactDialog();
    messageStore.updateSelectedChatInfo({
      userId: contact.userId,
      chatId: "",
    });
  };

  return (
    <DialogTemplate
      title={<ContactsComponents.Title />}
      content={
        <ContactsComponents.Content
          contacts={userStore.contacts}
          onContactItemClicked={handleContactItemClicked}
        />
      }
      actions={
        <ContactsComponents.Actions
          onClose={handleCloseContactDialog}
          onAddContactClick={handleAddContactClick}
        />
      }
      open={globalStore.dialogState.contacts.open}
      paperStyle={{
        height: "90vh",
      }}
      onClose={handleCloseContactDialog}
    />
  );
};

export default Contacts;
