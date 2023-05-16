import AccountBoxTwoTone from "@mui/icons-material/AccountBoxTwoTone";
import AlternateEmailTwoTone from "@mui/icons-material/AlternateEmailTwoTone";
import CallTwoTone from "@mui/icons-material/CallTwoTone";
import SettingsAccessibilityTwoToneIcon from "@mui/icons-material/SettingsAccessibilityTwoTone";

import ListItem from "src/components/dialog/editProfile/ListItem";

const List = ({ bio, fullName, fullNumber, onItemClick, username }) =>
  [
    {
      name: "editBio",
      displayName: "Bio",
      value: bio,
      Icon: SettingsAccessibilityTwoToneIcon,
    },
    {
      name: "editFullName",
      displayName: "Name",
      value: fullName,
      Icon: AccountBoxTwoTone,
    },
    {
      displayName: "Phone Number",
      disabled: true,
      value: fullNumber,
      Icon: CallTwoTone,
    },
    {
      displayName: "Username",
      name: "editUsername",
      value: username || "Not set",
      Icon: AlternateEmailTwoTone,
    },
  ].map((item, i) => (
    <ListItem
      key={i}
      Icon={item.Icon}
      disabled={item.disabled}
      displayName={item.displayName}
      onItemClick={() => onItemClick(item)}
      value={item.value}
    />
  ));

export default List;
