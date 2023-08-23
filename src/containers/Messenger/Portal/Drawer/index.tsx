import { Divider, SwipeableDrawer } from "@mui/material";
import { KeyboardEvent, SyntheticEvent } from "react";

import { userUtils } from "~/classes/UserUtils";
import { Box } from "~/components";
import { useGlobalStore, useUserStore } from "~/store";
import { DialogName, ElementName } from "~/types";
import { utils } from "~/utils";

import DrawerList from "./DrawerList";
import PersonalData from "./PersonalData";

const Drawer = () => {
  const globalState = useGlobalStore();
  const userStore = useUserStore();

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

  const handleDrawerItemClick = (n: ElementName) => {
    if (n in globalState.dialogState) globalState.openDialog(n as DialogName);
  };

  const fullName = userUtils.concatFirstNameWithLastName(
    userStore.currentUserData
  );
  const fullNumber = userUtils.concatCountryCodeWithPhoneNumber(
    userStore.currentUserData
  );

  return (
    <SwipeableDrawer
      disableBackdropTransition={!utils.isIos()}
      disableDiscovery={utils.isIos()}
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

export default Drawer;
