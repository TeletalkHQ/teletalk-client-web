import { Box, Paper, Slide, Typography } from "@mui/material";

const MessageListItem = ({
  message,
  messageTime,
  chatDate,
  justify,
  messageItemContainerClassName,
  messageItemClassName,
  direction,
}) => {
  return (
    <>
      <Box
        display="flex"
        sx={{ width: "100%", padding: "3px" }}
        justifyContent={justify}
      >
        <Slide direction={direction} in={true} mountOnEnter unmountOnExit>
          <Paper
            sx={{ padding: "3px" }}
            className={`${messageItemClassName}`}
            elevation={1}
            // onContextMenu={(e) => onOtherStateChange(e)}
          >
            <Typography style={{ wordBreak: "break-word" }}>
              {message}
            </Typography>
            <Typography style={{ fontSize: "13px", float: "right" }}>
              {messageTime} {chatDate}
            </Typography>
          </Paper>
        </Slide>
      </Box>
    </>
  );
};

export default MessageListItem;
