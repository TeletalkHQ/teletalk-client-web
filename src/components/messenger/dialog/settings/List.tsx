import AccountBoxIcon from "@mui/icons-material/AccountBoxTwoTone";
import CallIcon from "@mui/icons-material/CallTwoTone";
import ChatIcon from "@mui/icons-material/ChatTwoTone";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotificationsTwoTone";
import LanguageIcon from "@mui/icons-material/LanguageTwoTone";
import LockIcon from "@mui/icons-material/LockTwoTone";
import PieChartIcon from "@mui/icons-material/PieChartTwoTone";
import StorageIcon from "@mui/icons-material/Storage";

import ListItem from "~/components/messenger/dialog/settings/ListItem";

import { OnSettingItemClick, SettingsList as SettingsListType } from "./types";

interface Props {
  onSettingItemClick: OnSettingItemClick;
}

const SettingsList: React.FC<Props> = ({ onSettingItemClick }) => {
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

export const settingsList: SettingsListType = [
  {
    disabled: false,
    displayName: "Edit Profile",
    Icon: AccountBoxIcon,
    name: "editProfile",
  },
  {
    disabled: true,
    displayName: "Notifications and Sounds",
    Icon: CircleNotificationsIcon,
    name: "notificationsAndSounds",
  },
  {
    disabled: true,
    displayName: "Privacy and Security",
    Icon: LockIcon,
    name: "privacyAndSecurity",
  },
  {
    disabled: true,
    displayName: "Chat Settings",
    Icon: ChatIcon,
    name: "chatSettings",
  },
  {
    disabled: true,
    displayName: "Advanced",
    Icon: PieChartIcon,
    name: "advanced",
  },
  {
    disabled: true,
    displayName: "Call Settings",
    Icon: CallIcon,
    name: "callSettings",
  },
  {
    disabled: true,
    displayName: "Language",
    Icon: LanguageIcon,
    name: "language",
  },
  {
    disabled: false,
    displayName: "Server Setup",
    Icon: StorageIcon,
    name: "serverSetup",
  },
];

export default SettingsList;
