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

const iconProperties = (text, elementName, Icon) => ({
  elementName,
  Icon,
  text,
});

const Icons = {
  AccountCircleOutlined: iconProperties(
    "Account",
    variables.other.helper.ELEMENT_NAMES.ACCOUNT,
    AccountCircleOutlinedIcon
  ),
  AllChatsOutlined7: iconProperties(
    "All Chats",
    variables.other.helper.ELEMENT_NAMES.ALL_CHATS,
    ForumOutlinedIcon
  ),
  ArrowBack: iconProperties(
    "Back",
    variables.other.helper.ELEMENT_NAMES.BACK,
    ArrowBackIcon
  ),
  AttachFile: iconProperties(
    "AttachFile",
    //FIXME: Some names are undefined
    variables.other.helper.ELEMENT_NAMES.ATTACH_FILE,
    AttachFileIcon
  ),
  BotOutlined: iconProperties(
    "Bot",
    variables.other.helper.ELEMENT_NAMES.BOT,
    SmartToyOutlinedIcon
  ),
  Calls: iconProperties(
    "Calls",
    variables.other.helper.ELEMENT_NAMES.CALLS,
    PermIdentityIcon
  ),
  ChannelsOutlined: iconProperties(
    "Channels",
    variables.other.helper.ELEMENT_NAMES.CHANNELS,
    CallOutlinedIcon
  ),
  Check: iconProperties(
    "Check",
    variables.other.helper.ELEMENT_NAMES.CHECK,
    CheckIcon
  ),
  Close: iconProperties(
    "Close",
    variables.other.helper.ELEMENT_NAMES.CLOSE,
    CloseIcon
  ),
  Contacts: iconProperties(
    "Contacts",
    variables.other.helper.ELEMENT_NAMES.CONTACTS,
    PeopleOutlineIcon
  ),
  EditChatsOutlined: iconProperties(
    "Edit Chats",
    variables.other.helper.ELEMENT_NAMES.EDIT_CHATS,
    SettingsInputComponentOutlinedIcon
  ),
  EmojiEmotions: iconProperties(
    "EmojiEmotions",
    variables.other.helper.ELEMENT_NAMES.EMOJI_EMOTIONS,
    EmojiEmotionsIcon
  ),
  Fingerprint: iconProperties(
    "Fingerprint",
    variables.other.helper.ELEMENT_NAMES.LOCK,
    FingerprintIcon
  ),
  Groups: iconProperties(
    "Groups",
    variables.other.helper.ELEMENT_NAMES.GROUPS,
    CampaignOutlinedIcon
  ),
  LockOutlined: iconProperties(
    "Lock",
    variables.other.helper.ELEMENT_NAMES.LOCK,
    LockOutlinedIcon
  ),
  LogoutOutlined: iconProperties(
    "Logout",
    variables.other.helper.ELEMENT_NAMES.LOGOUT,
    LogoutOutlinedIcon
  ),
  Menu: iconProperties(
    "Menu",
    variables.other.helper.ELEMENT_NAMES.MENU,
    MenuIcon
  ),
  MicNone: iconProperties(
    "MicNone",
    variables.other.helper.ELEMENT_NAMES.MIC_NONE,
    MicNoneIcon
  ),
  MoreVertical: iconProperties(
    "More",
    variables.other.helper.ELEMENT_NAMES.MORE,
    MoreVertIcon
  ),
  NewChannelOutlined: iconProperties(
    "New Channel",
    variables.other.helper.ELEMENT_NAMES.NEW_CHANNEL,
    CallOutlinedIcon
  ),
  NewGroupOutlined: iconProperties(
    "New Group",
    variables.other.helper.ELEMENT_NAMES.NEW_GROUP,
    CampaignOutlinedIcon
  ),
  NightModeOutlined: iconProperties(
    "Night Mode",
    variables.other.helper.ELEMENT_NAMES.NIGHT_MODE,
    Brightness4OutlinedIcon
  ),
  PersonalOutlined: iconProperties(
    "Personal",
    variables.other.helper.ELEMENT_NAMES.PERSONAL,
    PersonOutlineOutlinedIcon
  ),
  Search: iconProperties(
    "Search",
    variables.other.helper.ELEMENT_NAMES.SEARCH,
    SearchIcon
  ),
  SettingsOutlined: iconProperties(
    "Settings",
    variables.other.helper.ELEMENT_NAMES.SETTINGS,
    SettingsOutlinedIcon
  ),
  Telegram: iconProperties(
    "Telegram",
    variables.other.helper.ELEMENT_NAMES.TELEGRAM,
    TelegramIcon
  ),
  UnreadOutlined: iconProperties(
    "Unread Messages",
    variables.other.helper.ELEMENT_NAMES.UNREAD,
    AnnouncementOutlinedIcon
  ),
  VerifiedUser: iconProperties(
    "Verified User",
    variables.other.helper.ELEMENT_NAMES.LOCK,
    VerifiedUserIcon
  ),
};

export { Icons };
