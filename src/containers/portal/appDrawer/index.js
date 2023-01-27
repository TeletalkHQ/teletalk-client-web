import { Divider, SwipeableDrawer } from "@mui/material";

import { actions } from "src/store/actions";

import { Box } from "src/components/general/box";
import DrawerList from "src/components/portal/appDrawer/DrawerList";
import PersonalData from "src/components/portal/appDrawer/PersonalData";

import { useDispatch, useSelector } from "src/hooks/useThunkReducer";

import { commonActions } from "src/store/commonActions";

import { utilities } from "src/utilities";

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

export default AppDrawer;
