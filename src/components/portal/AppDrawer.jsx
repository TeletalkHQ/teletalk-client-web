import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";

import { useMainContext } from "hooks/useMainContext";

import { appIcons } from "variables/initials/initialValues/appIcons";

import { globalActions } from "actions/globalActions";
import CustomBox from "components/generals/boxes/CustomBox";
import { customTypeof } from "classes/CustomTypeof";

const { calls, contacts, logout, newChannel, newGroup, nightMode, settings } =
  appIcons;

//TODO Add to some functionality and add priority to each
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
  !customTypeof.check(navigator).type.undefined &&
  /iPad|iPhone|iPod/.test(navigator.userAgent);

const AppDrawer = () => {
  const {
    state: {
      globalState: {
        appDrawerState,
        appDrawerState: { currentAnchor },
      },
    },
    hooksOutput: { dispatch },
  } = useMainContext();

  const toggleDrawer = (event, open) => {
    if (
      event?.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    dispatch(globalActions.appDrawerOpenChangeAction({ open }));
  };

  const handleDrawerItemClick = (dialogName) => {
    dispatch(
      globalActions.dialogOpenChangeAction({
        dialogName,
        open: true,
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
            {drawerList.map(({ elementName, Icon, text }, index) => (
              <ListItem
                button
                key={index}
                onClick={(event) => {
                  toggleDrawer(event, false);
                  handleDrawerItemClick(elementName);
                }}
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
