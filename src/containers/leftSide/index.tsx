import Box from "~/components/general/box";
import ChatList from "~/components/leftSide/ChatList";
import SearchBar from "~/components/leftSide/SearchBar";
import { HandleChatListItemClick } from "~/components/leftSide/types";
import { useGlobalStore, useMessageStore } from "~/store";

const LeftSide = () => {
  const globalState = useGlobalStore();
  const messageState = useMessageStore();

  const handleDrawerIconClick = () => {
    globalState.changeDrawerOpen(true);
  };

  const handleChatListItemClick: HandleChatListItemClick = (data) => {
    messageState.updateSelectedChatInfo(data);
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
              selectedUserToChat={messageState.selectedChatInfo}
              onChatListItemClick={handleChatListItemClick}
            />
          </Box.List>
        </Box.Flex>
      </Box.Grid>
    </>
  );
};

export default LeftSide;
