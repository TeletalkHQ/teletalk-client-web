import { Divider, SwipeableDrawer } from "@mui/material";
import { KeyboardEvent, SyntheticEvent } from "react";

import { userUtils } from "~/classes/UserUtils";
import DrawerList from "~/components/drawer/DrawerList";
import PersonalData from "~/components/drawer/PersonalData";
import Box from "~/components/general/box";
import { useGlobalStore, useUserStore } from "~/store";
import { DialogName, ElementName } from "~/types";
import { utilities } from "~/utilities";

const AppDrawer = () => {
  const globalState = useGlobalStore();
  const userState = useUserStore();

  const toggleDrawer = (
    event: SyntheticEvent<{}, Event> | KeyboardEvent<HTMLDivElement>,
    open: boolean
  ) => {
    if (
      event?.type === "keydown" &&
      (("key" in event && event.key === "Tab") ||
        ("key" in event && event.key === "Shift"))
    ) {
      return;
    }

    globalState.changeDrawerOpen(open);
  };

  const handleDrawerItemClick = (elementName: ElementName) => {
    if (elementName in globalState.dialogState)
      globalState.openDialog(elementName as DialogName);
  };

  const fullName = userUtils.concatFirstNameWithLastName(userState);
  const fullNumber = userUtils.concatCountryCodeWithPhoneNumber(userState);

  return (
    <SwipeableDrawer
      disableBackdropTransition={!utilities.isIos()}
      disableDiscovery={utilities.isIos()}
      anchor={globalState.drawer.anchor}
      open={globalState.drawer.open}
      onClose={(event) => toggleDrawer(event, false)}
      onOpen={(event) => toggleDrawer(event, true)}
    >
      <Box.Div
        style={{
          width:
            globalState.drawer.anchor === "top" ||
            globalState.drawer.anchor === "bottom"
              ? "auto"
              : 250,
        }}
        role="presentation"
        onKeyDown={(event) => toggleDrawer(event, false)}
      >
        <PersonalData fullNumber={fullNumber} fullName={fullName} />

        <Divider />

        <DrawerList
          onClick={handleDrawerItemClick}
          toggleDrawer={toggleDrawer}
        />
      </Box.Div>
    </SwipeableDrawer>
  );
};

export default AppDrawer;
