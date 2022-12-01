import CustomAvatar from "components/general/other/CustomAvatar";
import CustomBox from "components/general/box/CustomBox";
import CustomFlexBox from "components/general/box/CustomFlexBox";
import CustomIconButton from "components/general/other/CustomIconButton";
import CustomPaper from "components/general/box/CustomPaper";
import CustomTypography from "components/general/typography/CustomTypography";

import { Icons } from "components/other/Icons";

const ChatBar = ({ contactName, onMessageContainerCloseClick }) => {
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
              <Icons.Close.Icon />
            </CustomIconButton>
          </CustomBox>
          <CustomFlexBox ai="center">
            <CustomAvatar alt={contactName} />
            <CustomTypography>{contactName}</CustomTypography>
          </CustomFlexBox>
          <CustomBox>
            <CustomIconButton>
              <Icons.MoreVertical.Icon />
            </CustomIconButton>
          </CustomBox>
        </CustomFlexBox>
      </CustomPaper>
    </>
  );
};

export default ChatBar;
