import { customTypeof } from "utility-store/src/classes/CustomTypeof";
import { SwipeableDrawer } from "@mui/material";

import { actions } from "store/actions";

import CustomBox from "components/general/box/CustomBox";
import CustomList from "components/general/box/CustomList";
import CustomListItem from "components/general/box/CustomListItem";
import CustomListItemIcon from "components/general/other/CustomListItemIcon";
import CustomListItemText from "components/general/box/CustomListItemText";
import Div from "components/general/box/Div";
import { Icons } from "components/other/Icons";

import { useMainContext } from "hooks/useMainContext";
import { useSelector } from "hooks/useThunkReducer";

import { commonActions } from "store/commonActions";

//TODO: Add to some functionality and add priority to each
const drawerList = [
  Icons.Calls,
  Icons.Contacts,
  Icons.LogoutOutlined,
  Icons.NewChannelOutlined,
  Icons.NewGroupOutlined,
  Icons.NightModeOutlined,
  Icons.SettingsOutlined,
];

//TODO: Move to appConfigs
const iOS =
  !customTypeof.isUndefined(navigator) &&
  /iPad|iPhone|iPod/.test(navigator.userAgent);

const AppDrawer = () => {
  const {
    hooksOutput: { dispatch },
  } = useMainContext();
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
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
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
