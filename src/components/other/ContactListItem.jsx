import CustomAvatar from "src/components/general/other/CustomAvatar";
import CustomBox from "src/components/general/box/CustomBox";
import CustomFlexBox from "src/components/general/box/CustomFlexBox";
import CustomListItem from "src/components/general/box/CustomListItem";

const ContactListItem = ({ name, lastSeen = "", onContactClick }) => {
  return (
    <CustomListItem
      button
      sx={{
        display: "flex",
        height: "65px",
      }}
      onClick={onContactClick}
    >
      <CustomBox>
        <CustomAvatar />
      </CustomBox>
      <CustomBox sx={{ width: "100%", ml: 1 }}>
        <CustomFlexBox jc="space-between" ai="center">
          <CustomBox>{name}</CustomBox>
          {/* <CustomBox>clock</CustomBox> */}
        </CustomFlexBox>
        <CustomFlexBox jc="space-between" ai="center">
          <CustomBox>{lastSeen}</CustomBox>
          {/* <CustomBox>icons</CustomBox> */}
        </CustomFlexBox>
      </CustomBox>
    </CustomListItem>
  );
};

export default ContactListItem;
