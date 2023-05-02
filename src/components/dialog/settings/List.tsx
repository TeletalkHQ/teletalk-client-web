import AccountBoxIcon from "@mui/icons-material/AccountBoxTwoTone";
import CallIcon from "@mui/icons-material/CallTwoTone";
import ChatIcon from "@mui/icons-material/ChatTwoTone";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotificationsTwoTone";
import LanguageIcon from "@mui/icons-material/LanguageTwoTone";
import LockIcon from "@mui/icons-material/LockTwoTone";
import PieChartIcon from "@mui/icons-material/PieChartTwoTone";

import ListItem from "src/components/dialog/settings/ListItem";

const list = [
  {
    Icon: AccountBoxIcon,
    displayName: "Edit Profile",
  },
  {
    displayName: "Notifications and Sounds",
    Icon: CircleNotificationsIcon,
  },
  { displayName: "Privacy and Security", Icon: LockIcon },
  { displayName: "Chat Settings", Icon: ChatIcon },
  { displayName: "Advanced", Icon: PieChartIcon },
  { displayName: "Call Settings", Icon: CallIcon },
  { displayName: "Language", Icon: LanguageIcon },
];

const SettingsList = ({ onSettingItemClick }) =>
  list.map((item, i) => (
    <ListItem
      key={i}
      displayName={item.displayName}
      Icon={item.Icon}
      onSettingItemClick={() => onSettingItemClick(item)}
    />
  ));

export default SettingsList;
