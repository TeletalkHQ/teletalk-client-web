import CustomAvatar from "src/components/general/other/CustomAvatar";
import CustomBox from "src/components/general/box/CustomBox";
import CustomFlexBox from "src/components/general/box/CustomFlexBox";
import CustomIconButton from "src/components/general/other/CustomIconButton";
import CustomPaper from "src/components/general/box/CustomPaper";
import CustomTypography from "src/components/general/typography/CustomTypography";

import { Icons } from "src/components/other/Icons";

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
