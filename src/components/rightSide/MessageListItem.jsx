import { Box } from "src/components/general/box";
import Typography from "src/components/general/typography/Typography";

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
      <Box.Flex sx={{ width: "100%", padding: "3px" }} justifyContent={justify}>
        {/* <Transitions.Slide
          direction={direction}
          in={true}
          mountOnEnter
          unmountOnExit
        > */}
        <Box.Paper
          sx={{ padding: "3px" }}
          className={`${messageItemClassName}`}
          elevation={1}
          // onContextMenu={(e) => onOtherStateChange(e)}
        >
          <Typography style={{ wordBreak: "break-word" }}>{message}</Typography>
          <Typography style={{ fontSize: "13px", float: "right" }}>
            {messageTime} {chatDate}
          </Typography>
        </Box.Paper>
        {/* </Transitions.Slide> */}
      </Box.Flex>
    </>
  );
};

export default MessageListItem;
