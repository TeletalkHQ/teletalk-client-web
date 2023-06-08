import DoneAllIcon from "@mui/icons-material/DoneAll";
// import { SlideProps } from "@mui/material";

import Box from "~/components/general/box";
import Typography from "~/components/general/typography/Typography";
import GreyTextParagraph from "~/components/general/typography/GreyTextParagraph";

import { Style } from "~/types";

interface Props {
  chatDate: string;
  justify: Style["justifyContent"];
  message: string;
  messageTime: string;
  // transitionDirection: SlideProps["direction"];
}

const MessageListItem: React.FC<Props> = ({
  chatDate,
  // transitionDirection,
  justify,
  message,
  messageTime,
}) => {
  return (
    <>
      <Box.Flex style={{ padding: 3 }} justifyContent={justify}>
        {/* <Transitions.Slide
          direction={transitionDirection}
          in={true}
          mountOnEnter
          unmountOnExit
        > */}
        <Box.Paper
          style={{ padding: 5, borderRadius: 10 }}
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
              <DoneAllIcon fontSize="small" />
            </GreyTextParagraph>
          </Box.Flex>
        </Box.Paper>
        {/* </Transitions.Slide> */}
      </Box.Flex>
    </>
  );
};

export default MessageListItem;
