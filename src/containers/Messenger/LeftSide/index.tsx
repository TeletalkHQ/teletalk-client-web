import { Box } from "~/components";
import { useGlobalStore, useMessageStore } from "~/store";

import ChatList from "./ChatList";
import SearchBar from "./SearchBar";
import { HandleChatListItemClick } from "./types";

const LeftSide = () => {
  const globalStore = useGlobalStore();
  const messageStore = useMessageStore();

  const handleDrawerIconClick = () => {
    globalStore.changeDrawerOpen(true);
  };

  const handleChatListItemClick: HandleChatListItemClick = (data) => {
    messageStore.updateSelectedChatInfo(data);
  };

  return (
    <>
      <Box.Grid
        style={{
          height: "100vh",
        }}
        container
        item
        sm={12}
        md={4}
        lg={3}
      >
        <Box.Flex col style={{ width: "100%", height: "100%" }}>
          <SearchBar onDrawerIconClick={handleDrawerIconClick} />

          <Box.List
            sx={{
              overflowY: "auto",
              padding: "5px",
              scrollBehavior: "smooth",
              width: "100%",
            }}
          >
            <ChatList
              selectedUserToChat={messageStore.selectedChatInfo}
              onChatListItemClick={handleChatListItemClick}
            />
          </Box.List>
        </Box.Flex>
      </Box.Grid>
    </>
  );
};

export default LeftSide;
