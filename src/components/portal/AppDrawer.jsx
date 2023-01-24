import { SwipeableDrawer } from "@mui/material";

import { actions } from "src/store/actions";

import { Box } from "src/components/general/box";
import { Icons } from "src/components/other/Icons";
import ListItemIcon from "src/components/general/other/ListItemIcon";

import { useDispatch, useSelector } from "src/hooks/useThunkReducer";

import { commonActions } from "src/store/commonActions";

import { utilities } from "src/utilities";

const drawerList = [
  Icons.Calls,
  Icons.Contacts,
  Icons.LogoutOutlined,
  Icons.NewChannelOutlined,
  Icons.NewGroupOutlined,
  Icons.NightModeOutlined,
  Icons.SettingsOutlined,
];

const AppDrawer = () => {
  const dispatch = useDispatch();
  const state = useSelector();

  const toggleDrawer = (event, open) => {
    if (
      event?.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    dispatch(actions.appDrawerOpenChange({ open }));
  };

  const handleDrawerItemClick = (elementName) => {
    dispatch(commonActions.openDialog(elementName));
  };

  return (
    <Box.Div>
      <SwipeableDrawer
        disableBackdropTransition={!utilities.isIos()}
        disableDiscovery={utilities.isIos()}
        anchor={state.global.appDrawer.currentAnchor}
        open={
          state.global.appDrawer.anchor[state.global.appDrawer.currentAnchor]
        }
        onClose={(event) => toggleDrawer(event, false)}
        onOpen={(event) => toggleDrawer(event, true)}
      >
        <Box.Div
          sx={{
            width:
              state.global.appDrawer.currentAnchor === "top" ||
              state.global.appDrawer.currentAnchor === "bottom"
                ? "auto"
                : 250,
          }}
          role="presentation"
          onKeyDown={(event) => toggleDrawer(event, false)}
        >
          <Box.List>
            {drawerList.map(({ elementName, Icon, text }, index) => (
              <Box.ListItem
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
                <Box.ListItemText primary={text} />
              </Box.ListItem>
            ))}
          </Box.List>
        </Box.Div>
      </SwipeableDrawer>
    </Box.Div>
  );
};

export default AppDrawer;
