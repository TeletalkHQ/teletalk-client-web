import CustomAvatar from "components/generals/otherGeneralComponents/CustomAvatar";
import CustomBox from "components/generals/boxes/CustomBox";
import CustomFlexBox from "components/generals/boxes/CustomFlexBox";
import CustomListItem from "components/generals/boxes/CustomListItem";

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
      <CustomBox col sx={{ width: "100%", ml: 1 }}>
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
