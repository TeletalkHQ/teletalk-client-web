import { globalActions } from "actions/globalActions";

import ChatList from "components/leftSideComponents/ChatList";

import { useMainContext } from "hooks/useMainContext";

import SearchBar from "components/leftSideComponents/SearchBar";
import SideBarList from "components/leftSideComponents/SideBarList";
import CustomFlexBox from "components/generals/boxes/CustomFlexBox";
import GridContainer from "components/generals/boxes/GridContainer";

const LeftSideContainer = () => {
  const {
    hooksOutput: { dispatch },
    state: {
      tempState: { selectedContact },
      userState: { chats, contacts },
    },
  } = useMainContext();

  const handleDrawerIconClick = () => {
    dispatch(globalActions.appDrawerOpenChangeAction({ open: true }));
  };

  return (
    <>
      <GridContainer
        sx={{ backgroundColor: "lightcyan" }}
        item
        sm={12}
        md={4}
        lg={3}
      >
        <CustomFlexBox col style={{ width: "100%", height: "100%" }}>
          <CustomFlexBox jc="space-between" ai="center">
            <SearchBar onDrawerIconClick={handleDrawerIconClick} />
          </CustomFlexBox>
          <CustomFlexBox jc="space-between" sx={{ height: "100%" }}>
            <SideBarList />
            <ChatList
              selectedContact={selectedContact}
              chats={chats}
              contacts={contacts}
            />
          </CustomFlexBox>
        </CustomFlexBox>
      </GridContainer>
    </>
  );
};

export default LeftSideContainer;
