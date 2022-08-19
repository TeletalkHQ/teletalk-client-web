import {
  AccountCircleOutlined as AccountCircleOutlinedIcon,
  AnnouncementOutlined as AnnouncementOutlinedIcon,
  ArrowBack as ArrowBackIcon,
  Brightness4Outlined as Brightness4OutlinedIcon,
  CallOutlined as CallOutlinedIcon,
  CampaignOutlined as CampaignOutlinedIcon,
  Check as CheckIcon,
  ForumOutlined as ForumOutlinedIcon,
  LockOutlined as LockOutlinedIcon,
  LogoutOutlined as LogoutOutlinedIcon,
  Menu as MenuIcon,
  PeopleOutline as PeopleOutlineIcon,
  PermIdentity as PermIdentityIcon,
  PersonOutlineOutlined as PersonOutlineOutlinedIcon,
  Search as SearchIcon,
  SettingsInputComponentOutlined as SettingsInputComponentOutlinedIcon,
  SettingsOutlined as SettingsOutlinedIcon,
  SmartToyOutlined as SmartToyOutlinedIcon,
  VerifiedUser as VerifiedUserIcon,
  Fingerprint as FingerprintIcon,
  Close as CloseIcon,
  MoreVert as MoreVertIcon,
  AttachFile as AttachFileIcon,
  EmojiEmotions as EmojiEmotionsIcon,
  MicNone as MicNoneIcon,
  Telegram as TelegramIcon,
} from "@mui/icons-material";

import { elementNames } from "variables/initials/initialValues/elementNames";

const appIconProperties = (text, elementName, Icon) => ({
  text,
  elementName,
  Icon,
});

const appIcons = {
  accountCircle: appIconProperties(
    "Account",
    elementNames.account,
    AccountCircleOutlinedIcon
  ),
  allChats: appIconProperties(
    "All Chats",
    elementNames.allChats,
    ForumOutlinedIcon
  ),
  arrowBack: appIconProperties("Back", elementNames.back, ArrowBackIcon),
  attachFile: appIconProperties(
    "AttachFile",
    elementNames.attachFile,
    AttachFileIcon
  ),
  bot: appIconProperties("Bot", elementNames.bot, SmartToyOutlinedIcon),
  calls: appIconProperties("Calls", elementNames.calls, PermIdentityIcon),
  channels: appIconProperties(
    "Channels",
    elementNames.channels,
    CallOutlinedIcon
  ),
  check: appIconProperties("Check", elementNames.check, CheckIcon),
  close: appIconProperties("Close", elementNames.close, CloseIcon),
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
  emojiEmotions: appIconProperties(
    "EmojiEmotions",
    elementNames.emojiEmotions,
    EmojiEmotionsIcon
  ),
  fingerprint: appIconProperties(
    "Fingerprint",
    elementNames.lock,
    FingerprintIcon
  ),
  groups: appIconProperties(
    "Groups",
    elementNames.groups,
    CampaignOutlinedIcon
  ),
  lockOutlined: appIconProperties("Lock", elementNames.lock, LockOutlinedIcon),
  logout: appIconProperties("Logout", elementNames.logout, LogoutOutlinedIcon),
  menu: appIconProperties("Menu", elementNames.menu, MenuIcon),
  micNone: appIconProperties("MicNone", elementNames.micNone, MicNoneIcon),
  moreVertical: appIconProperties("More", elementNames.more, MoreVertIcon),
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
  telegram: appIconProperties("Telegram", elementNames.telegram, TelegramIcon),
  unread: appIconProperties(
    "Unread Messages",
    elementNames.unread,
    AnnouncementOutlinedIcon
  ),
  verifiedUser: appIconProperties(
    "Verified User",
    elementNames.lock,
    VerifiedUserIcon
  ),
};

export { appIcons };
