import {
  AnnouncementOutlined as AnnouncementOutlinedIcon,
  Brightness4Outlined as Brightness4OutlinedIcon,
  CallOutlined as CallOutlinedIcon,
  CampaignOutlined as CampaignOutlinedIcon,
  ForumOutlined as ForumOutlinedIcon,
  LogoutOutlined as LogoutOutlinedIcon,
  Menu as MenuIcon,
  PeopleOutline as PeopleOutlineIcon,
  PermIdentity as PermIdentityIcon,
  PersonOutlineOutlined as PersonOutlineOutlinedIcon,
  Search as SearchIcon,
  SettingsInputComponentOutlined as SettingsInputComponentOutlinedIcon,
  SettingsOutlined as SettingsOutlinedIcon,
  SmartToyOutlined as SmartToyOutlinedIcon,
} from "@mui/icons-material";

import { elementNames } from "variables/initials/initialValues/elementNames";

const appIconProperties = (text, elementName, Icon) => ({
  text,
  elementName,
  Icon,
});

const appIcons = {
  allChats: appIconProperties(
    "All Chats",
    elementNames.allChats,
    ForumOutlinedIcon
  ),
  bot: appIconProperties("Bot", elementNames.bot, SmartToyOutlinedIcon),
  calls: appIconProperties("Calls", elementNames.calls, PermIdentityIcon),
  channels: appIconProperties(
    "Channels",
    elementNames.channels,
    CallOutlinedIcon
  ),
  contacts: appIconProperties(
    "Contacts",
    elementNames.contacts,
    PeopleOutlineIcon
  ),
  editChats: appIconProperties(
    "Edit Chats",
    elementNames.editChats,
    SettingsInputComponentOutlinedIcon
  ),
  groups: appIconProperties(
    "Groups",
    elementNames.groups,
    CampaignOutlinedIcon
  ),
  logout: appIconProperties("Logout", elementNames.logout, LogoutOutlinedIcon),
  menu: appIconProperties("Menu", elementNames.menu, MenuIcon),
  newChannel: appIconProperties(
    "New Channel",
    elementNames.newChannel,
    CallOutlinedIcon
  ),
  newGroup: appIconProperties(
    "New Group",
    elementNames.newGroup,
    CampaignOutlinedIcon
  ),
  nightMode: appIconProperties(
    "Night Mode",
    elementNames.nightMode,
    Brightness4OutlinedIcon
  ),
  personal: appIconProperties(
    "Personal",
    elementNames.personal,
    PersonOutlineOutlinedIcon
  ),
  search: appIconProperties("Search", elementNames.search, SearchIcon),
  settings: appIconProperties(
    "Settings",
    elementNames.settings,
    SettingsOutlinedIcon
  ),
  unread: appIconProperties(
    "Unread Messages",
    elementNames.unread,
    AnnouncementOutlinedIcon
  ),
};

export { appIcons };
