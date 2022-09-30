import CustomAvatar from "components/generals/otherGeneralComponents/CustomAvatar";
import CustomBox from "components/generals/boxes/CustomBox";
import CustomFlexBox from "components/generals/boxes/CustomFlexBox";
import CustomListItem from "components/generals/boxes/CustomListItem";

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
        <CustomFlexBox jc="space-between" ai="center">
          <CustomBox>{name}</CustomBox>
          <CustomBox>clock</CustomBox>
        </CustomFlexBox>
        <CustomFlexBox jc="space-between" ai="center">
          <CustomBox>{message}</CustomBox>
          <CustomBox>icons</CustomBox>
        </CustomFlexBox>
      </CustomFlexBox>
    </CustomListItem>
  );
};

export default ChatListItem;
