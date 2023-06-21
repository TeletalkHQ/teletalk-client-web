import ListItem from "~/components/dialog/contacts/ListItem";
import { UserItem, Users } from "~/types";

interface Props {
  contacts: Users;
  onContactItemClicked: (contact: UserItem) => void;
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
