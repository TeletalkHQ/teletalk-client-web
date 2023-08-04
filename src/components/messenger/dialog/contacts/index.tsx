import { ContactItem } from "utility-store/lib/types";

import { extractor } from "~/classes/Extractor";
import Actions from "~/components/messenger/dialog/contacts/Actions";
import Content from "~/components/messenger/dialog/contacts/Content";
import Title from "~/components/messenger/dialog/contacts/Title";
import DialogTemplate from "~/components/messenger/dialog/template";
import { useContextMenu } from "~/hooks/useContextMenu";
import { useGlobalStore, useMessageStore, useUserStore } from "~/store";
import { ExtendedOnContextMenu } from "~/types";

const Contacts = () => {
  const globalStore = useGlobalStore();
  const messageStore = useMessageStore();
  const userStore = useUserStore();

  const { onContextMenu } = useContextMenu([
    {
      text: "Edit Contact",
      handler: () => {
        globalStore.closeContextMenu();
        globalStore.closeDialog("contacts");
        globalStore.openDialog("editContactWithCellphone");
      },
    },
  ]);

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

  const handleContextMenu: ExtendedOnContextMenu<ContactItem> = (event, c) => {
    globalStore.setEditingContact({
      ...extractor.fullName(c),
      userId: c.userId,
    });
    onContextMenu(event);
  };

  return (
    <DialogTemplate
      title={<Title />}
      content={
        <Content
          contacts={userStore.contacts}
          onContactItemClicked={handleContactItemClicked}
          onContextMenu={handleContextMenu}
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
