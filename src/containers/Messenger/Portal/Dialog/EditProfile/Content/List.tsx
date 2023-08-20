import { EditProfileListItemOnClick } from "../types";
import ListItem from "./ListItem";
import { makeList } from "./data";

interface Props {
  bio: string;
  fullName: string;
  fullNumber: string;
  onClick: EditProfileListItemOnClick;
  username: string;
}

const List: React.FC<Props> = ({
  bio,
  fullName,
  fullNumber,
  onClick,
  username,
}) => {
  return (
    <>
      {makeList({
        bio,
        fullName,
        fullNumber,
        username,
      }).map((item, i) => (
        <ListItem
          key={i}
          Icon={item.Icon}
          disabled={item.disabled}
          label={item.label}
          onClick={() => onClick(item)}
          value={item.value}
        />
      ))}
    </>
  );
};

export default List;
