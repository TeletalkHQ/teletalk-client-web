import AccountBoxIcon from "@mui/icons-material/AccountBoxTwoTone";
import CallIcon from "@mui/icons-material/CallTwoTone";
import ChatIcon from "@mui/icons-material/ChatTwoTone";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotificationsTwoTone";
import LanguageIcon from "@mui/icons-material/LanguageTwoTone";
import LockIcon from "@mui/icons-material/LockTwoTone";
import PieChartIcon from "@mui/icons-material/PieChartTwoTone";

import ListItem from "~/components/dialog/settings/ListItem";

import { OnSettingItemClick } from "./types";

export const settingsList = [
  {
    Icon: AccountBoxIcon,
    displayName: "Edit Profile",
  },
  {
    displayName: "Notifications and Sounds",
    Icon: CircleNotificationsIcon,
  },
  {
    displayName: "Privacy and Security",
    Icon: LockIcon,
  },
  {
    displayName: "Chat Settings",
    Icon: ChatIcon,
  },
  {
    displayName: "Advanced",
    Icon: PieChartIcon,
  },
  {
    displayName: "Call Settings",
    Icon: CallIcon,
  },
  {
    displayName: "Language",
    Icon: LanguageIcon,
  },
] as const;

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

export default SettingsList;
