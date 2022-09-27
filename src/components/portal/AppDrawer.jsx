import { customTypeof } from "utility-store/src/classes/CustomTypeof";

import { SwipeableDrawer } from "@mui/material";

import { useMainContext } from "hooks/useMainContext";

import { appIcons } from "variables/initials/initialValues/appIcons";

import { globalActions } from "actions/globalActions";

import CustomBox from "components/generals/boxes/CustomBox";
import CustomList from "components/generals/boxes/CustomList";
import CustomListItem from "components/generals/boxes/CustomListItem";
import CustomListItemIcon from "components/generals/otherGeneralComponents/CustomListItemIcon";
import CustomListItemText from "components/generals/boxes/CustomListItemText";
import Div from "components/generals/boxes/Div";

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

//TODO: Move to appConfigs
const iOS =
  !customTypeof.check(navigator).type.isUndefined &&
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

  const handleDrawerItemClick = (elementName) => {
    dispatch(
      globalActions.dialogOpenChangeAction({
        dialogName: elementName,
        open: true,
      })
    );
  };

  return (
    <Div>
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
