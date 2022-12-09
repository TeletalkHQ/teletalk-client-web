import CustomFlexBox from "src/components/general/box/CustomFlexBox";
import CustomPaper from "src/components/general/box/CustomPaper";
import CustomTypography from "src/components/general/typography/CustomTypography";

// import { Transitions } from "src/components/others/Transitions";

const MessageListItem = ({
  chatDate,
  // direction,
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
        {/* <Transitions.Slide
          direction={direction}
          in={true}
          mountOnEnter
          unmountOnExit
        > */}
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
        {/* </Transitions.Slide> */}
      </CustomFlexBox>
    </>
  );
};

export default MessageListItem;
