import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";

import { useMyContext } from "hooks/useMyContext";

import { appIcons } from "variables/initials/initialValues/initialValues";

import { globalActions } from "actions/globalActions";
import CustomBox from "components/generals/boxes/CustomBox";

const { calls, contacts, newChannel, newGroup, nightMode, settings, logout } =
  appIcons;

const drawerList = [
  calls,
  contacts,
  logout,
  newChannel,
  newGroup,
  nightMode,
  settings,
];

const iOS =
  typeof navigator !== "undefined" &&
  /iPad|iPhone|iPod/.test(navigator.userAgent);

const AppDrawer = () => {
  const {
    state: {
      globalState: {
        appDrawerState,
        appDrawerState: { currentAnchor },
        dialogState,
      },
    },
    hooksOutput: { dispatch },
  } = useMyContext();

  const toggleDrawer = (event, open) => {
    if (
      event?.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    dispatch(globalActions.appDrawerOpenChangeAction({ open }));
  };

  const handleDrawerItemClick = (event, target) => {
    toggleDrawer(event, false);

    dispatch(
      globalActions.dialogAction({
        dialogState: { ...dialogState, [target]: { open: true } },
      })
    );
  };

  return (
    <div>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        anchor={currentAnchor}
        open={appDrawerState.anchor[currentAnchor]}
        onClose={(event) => toggleDrawer(event, false)}
        onOpen={(event) => toggleDrawer(event, true)}
      >
        <CustomBox
          sx={{
            width:
              currentAnchor === "top" || currentAnchor === "bottom"
                ? "auto"
                : 250,
          }}
          role="presentation"
          onKeyDown={(event) => toggleDrawer(event, false)}
        >
          <List>
            {drawerList.map(({ text, target, Icon }, index) => (
              <ListItem
                button
                key={index}
                onClick={(event) => handleDrawerItemClick(event, target)}
              >
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </CustomBox>
      </SwipeableDrawer>
    </div>
  );
};

export default AppDrawer;
