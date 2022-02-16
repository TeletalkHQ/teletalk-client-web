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

//TODO Uppercase initialViewMode keys values
const initialViewMode = {
	signIn: "signIn",
	verifySignIn: "verifySignIn",
	newUserProfile: "newUserProfile",
};

const initialValues = {
	allChats: fn("All Chats", "allChats", ForumOutlined),
	bot: fn("Bot", "bot", SmartToyOutlined),
	calls: fn("Calls", "calls", PermIdentity),
	channels: fn("Channels", "channels", CallOutlined),
	contacts: fn("Contacts", "contacts", PeopleOutline),
	editChats: fn("Edit Chats", "editChats", SettingsInputComponentOutlined),
	groups: fn("Groups", "groups", CampaignOutlined),
	menu: fn("Menu", "menu", MenuIcon),
	newChannel: fn("New Channel", "newChannel", CallOutlined),
	newGroup: fn("New Group", "newGroup", CampaignOutlined),
	nightMode: fn("Night Mode", "nightMode", Brightness4Outlined),
	personal: fn("Personal", "personal", PersonOutlineOutlined),
	search: fn("Search", "search", SearchIcon),
	settings: fn("Settings", "settings", SettingsOutlined),
	unread: fn("Unread Messages", "unread", AnnouncementOutlined),
	logout: fn("Logout", "logout", LogoutOutlined),
};

const initialContact = { firstName: "", lastName: "", phoneNumber: "", privateID: "" };

const initialMessage = {
	text: "",
	messageID: "",
	senderID: "",
};

export { initialValues, initialViewMode, initialContact, initialMessage };
