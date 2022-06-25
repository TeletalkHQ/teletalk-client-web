import {
  Brightness4Outlined,
  CallOutlined,
  CampaignOutlined,
  PeopleOutline,
  PermIdentity,
  SettingsOutlined,
  Menu as MenuIcon,
  Search as SearchIcon,
  ForumOutlined,
  PersonOutlineOutlined,
  SmartToyOutlined,
  AnnouncementOutlined,
  SettingsInputComponentOutlined,
  LogoutOutlined,
} from "@mui/icons-material";

const fn = (text, target, Icon) => ({ text, target, Icon });

const INITIAL_VIEW_MODE = {
  SIGN_IN: "SIGN_IN",
  VERIFY_SIGN_IN: "VERIFY_SIGN_IN",
  NEW_USER_PROFILE: "NEW_USER_PROFILE",
  MESSENGER: "MESSENGER",
};

//REDESIGN

const appIcons = {
  allChats: fn("All Chats", "allChats", ForumOutlined),
  bot: fn("Bot", "bot", SmartToyOutlined),
  calls: fn("Calls", "calls", PermIdentity),
  channels: fn("Channels", "channels", CallOutlined),
  contacts: fn("Contacts", "contacts", PeopleOutline),
  editChats: fn("Edit Chats", "editChats", SettingsInputComponentOutlined),
  groups: fn("Groups", "groups", CampaignOutlined),
  logout: fn("Logout", "logout", LogoutOutlined),
  menu: fn("Menu", "menu", MenuIcon),
  newChannel: fn("New Channel", "newChannel", CallOutlined),
  newGroup: fn("New Group", "newGroup", CampaignOutlined),
  nightMode: fn("Night Mode", "nightMode", Brightness4Outlined),
  personal: fn("Personal", "personal", PersonOutlineOutlined),
  search: fn("Search", "search", SearchIcon),
  settings: fn("Settings", "settings", SettingsOutlined),
  unread: fn("Unread Messages", "unread", AnnouncementOutlined),
};

const initialContact = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  privateId: "",
};

const initialMessage = {
  text: "",
  messageID: "",
  senderID: "",
};

const initialCountry = {
  countryCode: "",
  countryName: "",
  countryShortName: "",
};

const initialRouteTemplateItem = {
  properties: {
    method: "",
    route: "",
    statusCode: 0,
  },
  info: {
    version: "",
    description: "",
  },
};

const initialErrorTemplateItem = {
  properties: {
    errorCode: 0,
    statusCode: 0,
    message: "",
    reason: "",
  },
  info: {
    version: "",
    description: "",
  },
};

export {
  appIcons,
  initialContact,
  initialCountry,
  initialErrorTemplateItem,
  initialMessage,
  initialRouteTemplateItem,
  INITIAL_VIEW_MODE,
};
