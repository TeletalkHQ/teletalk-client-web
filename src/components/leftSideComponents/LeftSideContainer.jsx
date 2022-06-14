import { Box } from "@mui/material";

import ChatList from "components/leftSideComponents/ChatList";

import { appDrawerAction } from "actions/globalActions/globalActions";

import { useMyContext } from "hooks/useMyContext";

import SearchBar from "components/leftSideComponents/SearchBar";
import SideBarList from "components/leftSideComponents/SideBarList";

const LeftSideContainer = () => {
  const {
    hooksOutput: { dispatch },
    state: {
      globalState: { appDrawerState },
      tempState: { selectedContact },
      userState: { chats, contacts },
    },
  } = useMyContext();

  const handleDrawerIconClick = () => {
    dispatch(
      appDrawerAction({
        appDrawerState: {
          ...appDrawerState,
          anchor: {
            ...appDrawerState.anchor,
            [appDrawerState.currentAnchor]: true,
          },
        },
      })
    );
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        style={{ width: "100%", height: "100%" }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <SearchBar onDrawerIconClick={handleDrawerIconClick} />
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{ height: "100%" }}
        >
          <SideBarList />
          <ChatList
            selectedContact={selectedContact}
            chats={chats}
            contacts={contacts}
          />
        </Box>
      </Box>
    </>
  );
};

export default LeftSideContainer;
