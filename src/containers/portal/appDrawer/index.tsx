import { Divider, SwipeableDrawer } from "@mui/material";

import { actions } from "~/store/actions";

import Box from "~/components/general/box";

import DrawerList from "~/components/portal/appDrawer/DrawerList";
import PersonalData from "~/components/portal/appDrawer/PersonalData";

import { commonActions } from "~/store/commonActions";

import { utilities } from "~/utilities";
import { userUtilities } from "~/classes/UserUtilities";

const AppDrawer = () => {
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

  const fullName = userUtilities.makeFullName(state.user);
  const fullNumber = userUtilities.makeFullNumber(state.user);

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
        <PersonalData fullNumber={fullNumber} fullName={fullName} />

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
