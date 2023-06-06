import DoneAllIcon from "@mui/icons-material/DoneAll";

import Box from "~/components/general/box";

import Typography from "~/components/general/typography/Typography";
import GreyTextParagraph from "../general/typography/GreyTextParagraph";

// import { Transitions } from "~/components/others/Transitions";

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
      <Box.Flex style={{ padding: 3 }} justifyContent={justify}>
        {/* <Transitions.Slide
          direction={direction}
          in={true}
          mountOnEnter
          unmountOnExit
        > */}
        <Box.Paper
          style={{ padding: 5, borderRadius: 10 }}
          className={`${messageItemClassName}`}
          elevation={0}
          // onContextMenu={(e) => onOtherStateChange(e)}
        >
          <Typography style={{ wordBreak: "break-word" }}>{message}</Typography>

          <Box.Flex
            style={{ fontSize: 12 }}
            justifyContent="flex-end"
            gap={0.2}
            alignItems="center"
          >
            <GreyTextParagraph>{messageTime || "12:24"}</GreyTextParagraph>
            <GreyTextParagraph>{chatDate}</GreyTextParagraph>
            <GreyTextParagraph>
              <DoneAllIcon fontSize="12" />
            </GreyTextParagraph>
          </Box.Flex>
        </Box.Paper>
        {/* </Transitions.Slide> */}
      </Box.Flex>
    </>
  );
};

export default MessageListItem;
