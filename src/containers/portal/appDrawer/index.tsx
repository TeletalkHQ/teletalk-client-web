import { Divider, SwipeableDrawer } from "@mui/material";

import { userUtils } from "~/classes/UserUtils";
import Box from "~/components/general/box";
import DrawerList from "~/components/portal/appDrawer/DrawerList";
import PersonalData from "~/components/portal/appDrawer/PersonalData";
import { actions } from "~/store/actions";
import { commonActions } from "~/store/commonActions";
import { utilities } from "~/utilities";

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

  const fullName = userUtils.concatFirstNameWithLastName(userState);
  const fullNumber = userUtils.concatCountryCodeWithPhoneNumber(userState);

  return (
    <SwipeableDrawer
      disableBackdropTransition={!utilities.isIos()}
      disableDiscovery={utilities.isIos()}
      anchor={globalState.appDrawer.currentAnchor}
      open={globalState.appDrawer.anchor[globalState.appDrawer.currentAnchor]}
      onClose={(event) => toggleDrawer(event, false)}
      onOpen={(event) => toggleDrawer(event, true)}
    >
      <Box.Div
        style={{
          width:
            globalState.appDrawer.currentAnchor === "top" ||
            globalState.appDrawer.currentAnchor === "bottom"
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
