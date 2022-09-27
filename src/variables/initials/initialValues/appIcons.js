import {
  AccountCircleOutlined as AccountCircleOutlinedIcon,
  AnnouncementOutlined as AnnouncementOutlinedIcon,
  ArrowBack as ArrowBackIcon,
  AttachFile as AttachFileIcon,
  Brightness4Outlined as Brightness4OutlinedIcon,
  CallOutlined as CallOutlinedIcon,
  CampaignOutlined as CampaignOutlinedIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  EmojiEmotions as EmojiEmotionsIcon,
  Fingerprint as FingerprintIcon,
  ForumOutlined as ForumOutlinedIcon,
  LockOutlined as LockOutlinedIcon,
  LogoutOutlined as LogoutOutlinedIcon,
  Menu as MenuIcon,
  MicNone as MicNoneIcon,
  MoreVert as MoreVertIcon,
  PeopleOutline as PeopleOutlineIcon,
  PermIdentity as PermIdentityIcon,
  PersonOutlineOutlined as PersonOutlineOutlinedIcon,
  Search as SearchIcon,
  SettingsInputComponentOutlined as SettingsInputComponentOutlinedIcon,
  SettingsOutlined as SettingsOutlinedIcon,
  SmartToyOutlined as SmartToyOutlinedIcon,
  Telegram as TelegramIcon,
  VerifiedUser as VerifiedUserIcon,
} from "@mui/icons-material";

import { ELEMENT_NAMES } from "variables/otherVariables/constants";

const appIconProperties = (text, elementName, Icon) => ({
  text,
  elementName,
  Icon,
});

const appIcons = {
  accountCircle: appIconProperties(
    "Account",
    ELEMENT_NAMES.ACCOUNT,
    AccountCircleOutlinedIcon
  ),
  allChats: appIconProperties(
    "All Chats",
    ELEMENT_NAMES.ALL_CHATS,
    ForumOutlinedIcon
  ),
  arrowBack: appIconProperties("Back", ELEMENT_NAMES.BACK, ArrowBackIcon),
  attachFile: appIconProperties(
    "AttachFile",
    ELEMENT_NAMES.ATTACH_FILE,
    AttachFileIcon
  ),
  bot: appIconProperties("Bot", ELEMENT_NAMES.BOT, SmartToyOutlinedIcon),
  calls: appIconProperties("Calls", ELEMENT_NAMES.CALLS, PermIdentityIcon),
  channels: appIconProperties(
    "Channels",
    ELEMENT_NAMES.CHANNELS,
    CallOutlinedIcon
  ),
  check: appIconProperties("Check", ELEMENT_NAMES.CHECK, CheckIcon),
  close: appIconProperties("Close", ELEMENT_NAMES.CLOSE, CloseIcon),
  contacts: appIconProperties(
    "Contacts",
    ELEMENT_NAMES.CONTACTS,
    PeopleOutlineIcon
  ),
  editChats: appIconProperties(
    "Edit Chats",
    ELEMENT_NAMES.EDIT_CHATS,
    SettingsInputComponentOutlinedIcon
  ),
  emojiEmotions: appIconProperties(
    "EmojiEmotions",
    ELEMENT_NAMES.EMOJI_EMOTIONS,
    EmojiEmotionsIcon
  ),
  fingerprint: appIconProperties(
    "Fingerprint",
    ELEMENT_NAMES.LOCK,
    FingerprintIcon
  ),
  groups: appIconProperties(
    "Groups",
    ELEMENT_NAMES.GROUPS,
    CampaignOutlinedIcon
  ),
  lockOutlined: appIconProperties("Lock", ELEMENT_NAMES.LOCK, LockOutlinedIcon),
  logout: appIconProperties("Logout", ELEMENT_NAMES.LOGOUT, LogoutOutlinedIcon),
  menu: appIconProperties("Menu", ELEMENT_NAMES.MENU, MenuIcon),
  micNone: appIconProperties("MicNone", ELEMENT_NAMES.MIC_NONE, MicNoneIcon),
  moreVertical: appIconProperties("More", ELEMENT_NAMES.MORE, MoreVertIcon),
  newChannel: appIconProperties(
    "New Channel",
    ELEMENT_NAMES.NEW_CHANNEL,
    CallOutlinedIcon
  ),
  newGroup: appIconProperties(
    "New Group",
    ELEMENT_NAMES.NEW_GROUP,
    CampaignOutlinedIcon
  ),
  nightMode: appIconProperties(
    "Night Mode",
    ELEMENT_NAMES.NIGHT_MODE,
    Brightness4OutlinedIcon
  ),
  personal: appIconProperties(
    "Personal",
    ELEMENT_NAMES.PERSONAL,
    PersonOutlineOutlinedIcon
  ),
  search: appIconProperties("Search", ELEMENT_NAMES.SEARCH, SearchIcon),
  settings: appIconProperties(
    "Settings",
    ELEMENT_NAMES.SETTINGS,
    SettingsOutlinedIcon
  ),
  telegram: appIconProperties("Telegram", ELEMENT_NAMES.TELEGRAM, TelegramIcon),
  unread: appIconProperties(
    "Unread Messages",
    ELEMENT_NAMES.UNREAD,
    AnnouncementOutlinedIcon
  ),
  verifiedUser: appIconProperties(
    "Verified User",
    ELEMENT_NAMES.LOCK,
    VerifiedUserIcon
  ),
};

export { appIcons };
