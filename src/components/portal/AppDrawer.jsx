import { Divider, SwipeableDrawer } from "@mui/material";

import { actions } from "src/store/actions";

import { Box } from "src/components/general/box";
import { Icons } from "src/components/other/Icons";
import Avatar from "src/components/general/other/Avatar";
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
    <SwipeableDrawer
      disableBackdropTransition={!utilities.isIos()}
      disableDiscovery={utilities.isIos()}
      anchor={state.global.appDrawer.currentAnchor}
      open={state.global.appDrawer.anchor[state.global.appDrawer.currentAnchor]}
      onClose={(event) => toggleDrawer(event, false)}
      onOpen={(event) => toggleDrawer(event, true)}
    >
      <Box.Div
        style={{
          width:
            state.global.appDrawer.currentAnchor === "top" ||
            state.global.appDrawer.currentAnchor === "bottom"
              ? "auto"
              : 250,
        }}
        role="presentation"
        onKeyDown={(event) => toggleDrawer(event, false)}
      >
        <PersonalData
          countryCode={state.user.countryCode}
          firstName={state.user.firstName}
          lastName={state.user.lastName}
          phoneNumber={state.user.phoneNumber}
        />

        <Divider />

        <DrawerList
          onDrawerItemClick={handleDrawerItemClick}
          toggleDrawer={toggleDrawer}
        />
      </Box.Div>
    </SwipeableDrawer>
  );
};

const PersonalData = ({ countryCode, firstName, lastName, phoneNumber }) => (
  <Box.Flex col ai="center" jc="center" style={{ padding: 10 }} gap={1}>
    <Box.Div>
      <Avatar />
    </Box.Div>
    <Box.Div style={{ fontWeight: "bold" }}>
      {firstName} {lastName}
    </Box.Div>
    <Box.Div>
      +{countryCode} {phoneNumber}
    </Box.Div>
  </Box.Flex>
);

const DrawerList = ({ toggleDrawer, onDrawerItemClick }) => (
  <Box.List>
    {drawerList.map(({ elementName, Icon, text }, index) => (
      <Box.ListItem
        button
        key={index}
        onClick={(event) => {
          toggleDrawer(event, false);
          onDrawerItemClick(elementName);
        }}
      >
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <Box.ListItemText primary={text} />
      </Box.ListItem>
    ))}
  </Box.List>
);

export default AppDrawer;
