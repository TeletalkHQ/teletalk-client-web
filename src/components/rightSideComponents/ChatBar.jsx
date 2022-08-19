import CustomAvatar from "components/generals/otherGeneralComponents/CustomAvatar";
import CustomBox from "components/generals/boxes/CustomBox";
import CustomFlexBox from "components/generals/boxes/CustomFlexBox";
import CustomIconButton from "components/generals/otherGeneralComponents/CustomIconButton";
import CustomPaper from "components/generals/boxes/CustomPaper";
import CustomTypography from "components/generals/typographies/CustomTypography";

import { appIcons } from "variables/initials/initialValues/appIcons";

const ChatBar = ({ chatName, onMessageContainerCloseClick }) => {
  return (
    <>
      <CustomPaper sx={{ width: "100%", height: "100%" }}>
        <CustomFlexBox
          sx={{ width: "100%", height: "100%" }}
          jc="space-between"
          ai="center"
        >
          <CustomBox>
            <CustomIconButton onClick={onMessageContainerCloseClick}>
              <appIcons.close.Icon />
            </CustomIconButton>
          </CustomBox>
          <CustomFlexBox ai="center">
            <CustomAvatar alt={chatName} />
            <CustomTypography>{chatName}</CustomTypography>
          </CustomFlexBox>
          <CustomBox>
            <CustomIconButton>
              <appIcons.moreVertical.Icon />
            </CustomIconButton>
          </CustomBox>
        </CustomFlexBox>
      </CustomPaper>
    </>
  );
};

export default ChatBar;
