import { OnSettingItemClick } from "../types";
import ListItem from "./ListItem";
import { settingsList } from "./data";

interface Props {
  onSettingItemClick: OnSettingItemClick;
}

const List: React.FC<Props> = ({ onSettingItemClick }) => {
  return (
    <>
      {settingsList.map((item, i) => (
        <ListItem
          disabled={item.disabled}
          key={i}
          displayName={item.displayName}
          Icon={item.Icon}
          onClick={() => onSettingItemClick(item)}
        />
      ))}
    </>
  );
};

export default List;
