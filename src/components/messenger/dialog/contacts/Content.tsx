import { ContactItem } from "utility-store/lib/types";

import ListItem from "~/components/messenger/dialog/contacts/ListItem";
import { Contacts, ExtendedOnContextMenu } from "~/types";

interface Props {
  contacts: Contacts;
  onContactItemClicked: (contact: ContactItem) => void;
  onContextMenu: ExtendedOnContextMenu<ContactItem>;
}

const ContactsContent: React.FC<Props> = ({
  contacts,
  onContactItemClicked,
  onContextMenu,
}) => {
  return (
    <>
      {contacts.map((item, index) => (
        <ListItem
          onContextMenu={(e) => {
            onContextMenu(e, item);
          }}
          onContactClick={() => onContactItemClicked(item)}
          key={index}
          fullName={`${item.firstName} ${item.lastName}`}
          lastSeen=""
        />
      ))}
    </>
  );
};

export default ContactsContent;
