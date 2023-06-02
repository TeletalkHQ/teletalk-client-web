import ListItem from "~/components/dialog/contacts/ListItem";

const ContactsContent = ({ contacts, onContactItemClicked }) =>
  contacts.map((contact, index) => (
    <ListItem
      onContactClick={() => onContactItemClicked(contact)}
      key={index}
      name={`${contact.firstName} ${contact.lastName}`}
    />
  ));

export default ContactsContent;
