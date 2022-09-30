import CustomFlexBox from "components/generals/boxes/CustomFlexBox";
import CustomPaper from "components/generals/boxes/CustomPaper";
import CustomTypography from "components/generals/typographies/CustomTypography";

import { transitionComponents } from "variables/otherVariables/transitionComponents";

const MessageListItem = ({
  chatDate,
  direction,
  justify,
  message,
  messageItemClassName,
  messageTime,
}) => {
  return (
    <>
      <CustomFlexBox
        sx={{ width: "100%", padding: "3px" }}
        justifyContent={justify}
      >
        <transitionComponents.Slide
          direction={direction}
          in={true}
          mountOnEnter
          unmountOnExit
        >
          <CustomPaper
            sx={{ padding: "3px" }}
            className={`${messageItemClassName}`}
            elevation={1}
            // onContextMenu={(e) => onOtherStateChange(e)}
          >
            <CustomTypography style={{ wordBreak: "break-word" }}>
              {message}
            </CustomTypography>
            <CustomTypography style={{ fontSize: "13px", float: "right" }}>
              {messageTime} {chatDate}
            </CustomTypography>
          </CustomPaper>
        </transitionComponents.Slide>
      </CustomFlexBox>
    </>
  );
};

export default MessageListItem;
