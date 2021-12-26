import { useState } from "react";

import {
	Box,
	SwipeableDrawer,
	List,
	Divider,
	ListItem,
	ListItemIcon,
	ListItemText,
} from "@mui/material";

import { Inbox as InboxIcon, Mail as MailIcon } from "@mui/icons-material";
import { useMyContext } from "~/Hooks/useMyContext";

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
			<List>
				{["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{["All mail", "Trash", "Spam"].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
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
