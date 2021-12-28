import {
	Box,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	SwipeableDrawer,
} from "@mui/material";

import {
	Brightness4Outlined,
	CallOutlined,
	CampaignOutlined,
	PeopleOutline,
	PermIdentity,
	SettingsOutlined,
} from "@mui/icons-material";

import { useMyContext } from "~/Hooks/useMyContext";

const icons = [
	{ text: "New Group", Icon: PeopleOutline },
	{ text: "New Channel", Icon: CampaignOutlined },
	{ text: "Contacts", Icon: PermIdentity },
	{ text: "Calls", Icon: CallOutlined },
	{ text: "Settings", Icon: SettingsOutlined },
	{ text: "Night Mode", Icon: Brightness4Outlined },
];

const iOS = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);

const AppDrawer = () => {
	const {
		state: {
			global: {
				appDrawerState,
				appDrawerState: { currentAnchor },
			},
		},
		hooksOutput: { dispatch },
	} = useMyContext();

	const toggleDrawer = (anchor, open) => (event) => {
		if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
			return;
		}

		dispatch({ type: "APP_DRAWER_STATE_CHANGE", payload: { anchor, open } });
	};

	const list = (anchor) => (
		<Box
			sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<Divider />
			<List>
				{icons.map(({ text, Icon }, index) => (
					<ListItem button key={index}>
						<ListItemIcon>
							<Icon />
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</Box>
	);

	return (
		<div>
			<SwipeableDrawer
				disableBackdropTransition={!iOS}
				disableDiscovery={iOS}
				anchor={currentAnchor}
				open={appDrawerState.anchor[currentAnchor]}
				onClose={toggleDrawer(currentAnchor, false)}
				onOpen={toggleDrawer(currentAnchor, true)}
			>
				{list(currentAnchor)}
			</SwipeableDrawer>
		</div>
	);
};

export default AppDrawer;
