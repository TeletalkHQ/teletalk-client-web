import { ContactItem } from "utility-store/lib/types";

import Actions from "~/components/messenger/dialog/contacts/Actions";
import Content from "~/components/messenger/dialog/contacts/Content";
import Title from "~/components/messenger/dialog/contacts/Title";
import DialogTemplate from "~/components/messenger/dialog/template";
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
      title={<Title />}
      content={
        <Content
          contacts={userStore.contacts}
          onContactItemClicked={handleContactItemClicked}
        />
      }
      actions={
        <Actions
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
