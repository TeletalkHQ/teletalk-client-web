import { SwipeableDrawer } from "@mui/material";

import { actions } from "src/store/actions";

import CustomBox from "src/components/general/box/CustomBox";
import CustomList from "src/components/general/box/CustomList";
import CustomListItem from "src/components/general/box/CustomListItem";
import CustomListItemIcon from "src/components/general/other/CustomListItemIcon";
import CustomListItemText from "src/components/general/box/CustomListItemText";
import Div from "src/components/general/box/Div";
import { Icons } from "src/components/other/Icons";

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
    <Div>
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
        <CustomBox
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
          <CustomList>
            {drawerList.map(({ elementName, Icon, text }, index) => (
              <CustomListItem
                button
                key={index}
                onClick={(event) => {
                  toggleDrawer(event, false);
                  handleDrawerItemClick(elementName);
                }}
              >
                <CustomListItemIcon>
                  <Icon />
                </CustomListItemIcon>
                <CustomListItemText primary={text} />
              </CustomListItem>
            ))}
          </CustomList>
        </CustomBox>
      </SwipeableDrawer>
    </Div>
  );
};

export default AppDrawer;
