import CustomAvatar from "components/general/other/CustomAvatar";
import CustomBox from "components/general/box/CustomBox";
import CustomFlexBox from "components/general/box/CustomFlexBox";
import CustomListItem from "components/general/box/CustomListItem";

const ChatListItem = ({ message, name, onChatListItemClick, selected }) => {
  return (
    <CustomListItem
      button
      selected={selected}
      sx={{
        display: "flex",
        height: "65px",
      }}
      onClick={onChatListItemClick}
    >
      <CustomBox>
        <CustomAvatar />
      </CustomBox>
      <CustomFlexBox col sx={{ width: "100%" }}>
        <CustomFlexBox sx={{ width: "100%" }} jc="space-between" ai="center">
          <CustomBox>{name}</CustomBox>
          <CustomBox>time</CustomBox>
        </CustomFlexBox>
        <CustomFlexBox jc="space-between" sx={{ width: "100%" }} ai="center">
          <CustomBox>{message}</CustomBox>
          <CustomBox>icons</CustomBox>
        </CustomFlexBox>
      </CustomFlexBox>
    </CustomListItem>
  );
};

export default ChatListItem;
