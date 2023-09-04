import { ContactItem } from "utility-store/lib/types";

import { ExtendedOnContextMenu, UserItem, Users, VoidWithArg } from "~/types";

import ListItem from "./ListItem";

interface Props {
  contacts: Users;
  onContactItemClicked: VoidWithArg<ContactItem>;
  onContextMenu: ExtendedOnContextMenu<UserItem>;
}

const Content: React.FC<Props> = ({
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

export default Content;
