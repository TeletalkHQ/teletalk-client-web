import { ContactItem } from "utility-store/lib/types";

import ListItem from "~/components/messenger/dialog/contacts/ListItem";
import { Contacts } from "~/types";

interface Props {
  contacts: Contacts;
  onContactItemClicked: (contact: ContactItem) => void;
}

const ContactsContent: React.FC<Props> = ({
  contacts,
  onContactItemClicked,
}) => {
  return (
    <>
      {contacts.map((contact, index) => (
        <ListItem
          onContactClick={() => onContactItemClicked(contact)}
          key={index}
          fullName={`${contact.firstName} ${contact.lastName}`}
          lastSeen=""
        />
      ))}
    </>
  );
};

export default ContactsContent;
