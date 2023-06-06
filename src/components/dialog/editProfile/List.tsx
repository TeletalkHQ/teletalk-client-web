import AccountBoxTwoTone from "@mui/icons-material/AccountBoxTwoTone";
import AlternateEmailTwoTone from "@mui/icons-material/AlternateEmailTwoTone";
import CallTwoTone from "@mui/icons-material/CallTwoTone";
import SettingsAccessibilityTwoToneIcon from "@mui/icons-material/SettingsAccessibilityTwoTone";

import ListItem from "~/components/dialog/editProfile/ListItem";

import {
  EditProfileListItemOnClick,
  EditProfileListItemProps,
} from "~/components/dialog/editProfile/types";

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
      {(
        [
          {
            name: "editBio",
            label: "Bio",
            disabled: false,
            value: bio,
            Icon: SettingsAccessibilityTwoToneIcon,
          },
          {
            name: "editFullName",
            label: "Name",
            disabled: false,
            value: fullName,
            Icon: AccountBoxTwoTone,
          },
          {
            name: "editPhoneNumber",
            label: "Phone Number",
            disabled: true,
            value: fullNumber,
            Icon: CallTwoTone,
          },
          {
            label: "Username",
            disabled: false,
            name: "editUsername",
            value: username || "Not set",
            Icon: AlternateEmailTwoTone,
          },
        ] as EditProfileListItemProps[]
      ).map((item, i) => (
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
