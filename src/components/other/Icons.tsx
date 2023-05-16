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

import { variables } from "src/variables";

const ELEMENT_NAMES = variables.other.helper.ELEMENT_NAMES;

const iconProperties = (text, elementName, Icon) => ({
  elementName,
  Icon,
  text,
});

const Icons = {
  AccountCircleOutlined: iconProperties(
    "Account",
    ELEMENT_NAMES.ACCOUNT,
    AccountCircleOutlinedIcon
  ),
  AllChatsOutlined: iconProperties(
    "All Chats",
    ELEMENT_NAMES.ALL_CHATS,
    ForumOutlinedIcon
  ),
  ArrowBack: iconProperties("Back", ELEMENT_NAMES.BACK, ArrowBackIcon),
  AttachFile: iconProperties(
    "Attach File",
    ELEMENT_NAMES.ATTACH_FILE,
    AttachFileIcon
  ),
  BotOutlined: iconProperties("Bot", ELEMENT_NAMES.BOT, SmartToyOutlinedIcon),
  Calls: iconProperties("Calls", ELEMENT_NAMES.CALLS, PermIdentityIcon),
  ChannelsOutlined: iconProperties(
    "Channels",
    ELEMENT_NAMES.CHANNELS,
    CallOutlinedIcon
  ),
  Check: iconProperties("Check", ELEMENT_NAMES.CHECK, CheckIcon),
  Close: iconProperties("Close", ELEMENT_NAMES.CLOSE, CloseIcon),
  Contacts: iconProperties(
    "Contacts",
    ELEMENT_NAMES.CONTACTS,
    PeopleOutlineIcon
  ),
  EditChatsOutlined: iconProperties(
    "Edit Chats",
    ELEMENT_NAMES.EDIT_CHATS,
    SettingsInputComponentOutlinedIcon
  ),
  EmojiEmotions: iconProperties(
    "Emoji Emotions",
    ELEMENT_NAMES.EMOJI_EMOTIONS,
    EmojiEmotionsIcon
  ),
  Fingerprint: iconProperties(
    "Fingerprint",
    ELEMENT_NAMES.LOCK,
    FingerprintIcon
  ),
  Groups: iconProperties("Groups", ELEMENT_NAMES.GROUPS, CampaignOutlinedIcon),
  LockOutlined: iconProperties("Lock", ELEMENT_NAMES.LOCK, LockOutlinedIcon),
  LogoutOutlined: iconProperties(
    "Logout",
    ELEMENT_NAMES.LOGOUT,
    LogoutOutlinedIcon
  ),
  Menu: iconProperties("Menu", ELEMENT_NAMES.MENU, MenuIcon),
  MicNone: iconProperties("MicNone", ELEMENT_NAMES.MIC_NONE, MicNoneIcon),
  MoreVertical: iconProperties("More", ELEMENT_NAMES.MORE, MoreVertIcon),
  NewChannelOutlined: iconProperties(
    "New Channel",
    ELEMENT_NAMES.NEW_CHANNEL,
    CallOutlinedIcon
  ),
  NewGroupOutlined: iconProperties(
    "New Group",
    ELEMENT_NAMES.NEW_GROUP,
    CampaignOutlinedIcon
  ),
  NightModeOutlined: iconProperties(
    "Night Mode",
    ELEMENT_NAMES.NIGHT_MODE,
    Brightness4OutlinedIcon
  ),
  PersonalOutlined: iconProperties(
    "Personal",
    ELEMENT_NAMES.PERSONAL,
    PersonOutlineOutlinedIcon
  ),
  Search: iconProperties("Search", ELEMENT_NAMES.SEARCH, SearchIcon),
  SettingsOutlined: iconProperties(
    "Settings",
    ELEMENT_NAMES.SETTINGS,
    SettingsOutlinedIcon
  ),
  Telegram: iconProperties("Telegram", ELEMENT_NAMES.TELEGRAM, TelegramIcon),
  UnreadOutlined: iconProperties(
    "Unread Messages",
    ELEMENT_NAMES.UNREAD,
    AnnouncementOutlinedIcon
  ),
  VerifiedUser: iconProperties(
    "Verified User",
    ELEMENT_NAMES.LOCK,
    VerifiedUserIcon
  ),
};

export { Icons };
