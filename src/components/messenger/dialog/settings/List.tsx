import AccountBoxIcon from "@mui/icons-material/AccountBoxTwoTone";
import CallIcon from "@mui/icons-material/CallTwoTone";
import ChatIcon from "@mui/icons-material/ChatTwoTone";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotificationsTwoTone";
import LanguageIcon from "@mui/icons-material/LanguageTwoTone";
import LockIcon from "@mui/icons-material/LockTwoTone";
import PieChartIcon from "@mui/icons-material/PieChartTwoTone";

import ListItem from "~/components/messenger/dialog/settings/ListItem";

import { OnSettingItemClick } from "./types";

interface Props {
  onSettingItemClick: OnSettingItemClick;
}

const SettingsList: React.FC<Props> = ({ onSettingItemClick }) => {
  return (
    <>
      {settingsList.map((item, i) => (
        <ListItem
          key={i}
          displayName={item.displayName}
          Icon={item.Icon}
          onClick={() => onSettingItemClick(item)}
        />
      ))}
    </>
  );
};

export const settingsList = [
  {
    displayName: "Edit Profile",
    Icon: AccountBoxIcon,
    name: "editProfile",
  },
  {
    displayName: "Notifications and Sounds",
    name: "notificationsAndSounds",
    Icon: CircleNotificationsIcon,
  },
  {
    displayName: "Privacy and Security",
    name: "privacyAndSecurity",
    Icon: LockIcon,
  },
  {
    displayName: "Chat Settings",
    name: "chatSettings",
    Icon: ChatIcon,
  },
  {
    displayName: "Advanced",
    name: "advanced",
    Icon: PieChartIcon,
  },
  {
    displayName: "Call Settings",
    name: "callSettings",
    Icon: CallIcon,
  },
  {
    displayName: "Language",
    name: "language",
    Icon: LanguageIcon,
  },
] as const;

export default SettingsList;
