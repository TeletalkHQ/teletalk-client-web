import {
	Box,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	SwipeableDrawer,
} from "@mui/material";

import { useMyContext } from "~/Hooks/useMyContext";

import { initialValues } from "~/Variables/constants/Initials/initialValues";
import { globalActions } from "~/Variables/constants/actions";

const { calls, contacts, newChannel, newGroup, nightMode, settings } = initialValues;

const drawerList = [calls, contacts, newChannel, newGroup, nightMode, settings];

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

	const toggleDrawer = (event, anchor, open) => {
		if (event?.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
			return;
		}

		dispatch({ type: globalActions.appDrawerState.type, payload: { anchor, open } });
	};

	return (
		<div>
			<SwipeableDrawer
				disableBackdropTransition={!iOS}
				disableDiscovery={iOS}
				anchor={currentAnchor}
				open={appDrawerState.anchor[currentAnchor]}
				onClose={(e) => toggleDrawer(e, currentAnchor, false)}
				onOpen={(e) => toggleDrawer(e, currentAnchor, true)}
			>
				<Box
					sx={{ width: currentAnchor === "top" || currentAnchor === "bottom" ? "auto" : 250 }}
					role="presentation"
					onKeyDown={(e) => toggleDrawer(e, currentAnchor, false)}
				>
					<List>
						{drawerList.map(({ text, Icon }, index) => (
							<ListItem
								button
								key={index}
								onClick={(e) => toggleDrawer(e, currentAnchor, false)}
							>
								<ListItemIcon>
									<Icon />
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
						))}
					</List>
				</Box>
			</SwipeableDrawer>
		</div>
	);
};

export default AppDrawer;
