import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";

import { useMyContext } from "~/Hooks/useMyContext";

import { appIcons } from "~/Variables/Constants/Initials/InitialValues/initialValues";

import {
  appDrawerAction,
  dialogAction,
} from "~/Actions/GlobalActions/globalActions";

const { calls, contacts, newChannel, newGroup, nightMode, settings, logout } =
  appIcons;

const drawerList = [
  calls,
  contacts,
  newChannel,
  newGroup,
  nightMode,
  settings,
  logout,
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

  const toggleDrawer = ({ event, anchor, open, target }) => {
    if (
      event?.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    target && handleDrawerItemClick(target);

    dispatch(
      appDrawerAction({
        appDrawerState: {
          ...appDrawerState,
          anchor: { ...appDrawerState.anchor, [anchor]: open },
        },
      })
    );
  };

  const handleDrawerItemClick = (target) => {
    if (!target || typeof target !== "string") {
      return;
    }

    dispatch(
      dialogAction({
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
        onClose={(event) =>
          toggleDrawer({ event, anchor: currentAnchor, open: false })
        }
        onOpen={(event) =>
          toggleDrawer({ event, anchor: currentAnchor, open: true })
        }
      >
        <Box
          sx={{
            width:
              currentAnchor === "top" || currentAnchor === "bottom"
                ? "auto"
                : 250,
          }}
          role="presentation"
          onKeyDown={(event) =>
            toggleDrawer({ event, anchor: currentAnchor, open: false })
          }
        >
          <List>
            {drawerList.map(({ text, target, Icon }, index) => (
              <ListItem
                button
                key={index}
                onClick={(event) =>
                  toggleDrawer({
                    event,
                    anchor: currentAnchor,
                    open: false,
                    target,
                  })
                }
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
